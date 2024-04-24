require("dotenv").config()
const express = require("express")
const body_parser = require("body-parser")
const app = express()
const nodemailer = require("nodemailer")
const cors = require("cors")
app.use(body_parser.json())

app.get("/", (req, res) => {
    res.send("Der Code läuft!")
})

app.use(cors("*"))

app.post("/send", (req, res) => {
    if (req.query.apitoken === process.env.APITOKEN) {
        console.log("request kam an!")
        try {
            const output = req.body.product == "" ? `
        <h1>${req.body.name} möchte dich kontaktieren</h1>
        <h4>${req.body.name} (angegebene Email-Adresse: <a href="mailto:${req.body.email}">${req.body.email}</a>) hat sich auf deiner Website zwar noch für keine Dienstleistung entschieden, aber folgende Nachricht hinterlassen:</h4>
        <p>${req.body.message}</p>
        ` : `
        <h1>${req.body.name} hätte gerne ein${req.body.product === "Illustration" ? "e" : ""} ${req.body.product} </h1>
        <h4>${req.body.name} (angegebene Email-Adresse: <a href="mailto:${req.body.email}">${req.body.email}</a>) hat auf deiner Website mit Wunsch für ein${req.body.product === "Illustration" ? "e" : ""} ${req.body.product} folgende Nachricht hinterlassen:</h4>
        <p>${req.body.message}</p>
        `
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            })

            let mailOptions = {
                from: "LIZRA - Web <" + process.env.EMAIL + ">",
                to: process.env.EMAILRECIEVER,
                subject: req.body.name + ": " + req.body.product,
                html: output
            }
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) return console.log(err)
                console.log("Mail gesendet!", info)
            })
            res.send("Fertig!")
        } catch (err) {
            res.status(400).send(err)
        }
    } else {
        res.status(400).send("ACCESS DENIED LENOR!")
    }

})

app.listen(process.env.PORT || 8080, err => {
    if (err) {
        console.log("ERROR DU LENOR!")
    } else {
        console.log("server listening on port: 8080")
    }
})