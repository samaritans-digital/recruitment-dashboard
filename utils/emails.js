const mandrill = require("mandrill-api/mandrill")
const mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_API_KEY)

const sendEmail = (tokenToSend, uidToSend, recipient) => {
    const url = `${process.env.HOST}/login/finish?token=${tokenToSend}&uid=${encodeURIComponent(uidToSend)}`
    const message = {
        html: `
            <p>Click the link to finish logging in:</p>
            <a href="${url}">Finish logging in</a>
            <p>If you didn't request this link, contact the Samaritans helpdesk immediately.</p>
        `,
        text: `Go to this URL to finish logging in: ${url}`,
        subject: "Finish logging into the recruitment dashboard",
        from_email: "donotreply@samaritans-volunteers.org",
        from_name: "Samaritans",
        to: [{"email": recipient}]
    }
    mandrillClient.messages.send({"message": message}, 
        result => {
            // On success
            console.log(result)
        }, e => {
            // On error
            console.log("An error occurred", e)
        })
}

module.exports = {
    sendEmail: sendEmail
}