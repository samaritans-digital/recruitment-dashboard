const mandrill = require("mandrill-api/mandrill")
const mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_API_KEY)

const sendLoginEmail = (tokenToSend, uidToSend, recipient) => {
    const url = `${process.env.HOST}/login/finish?token=${tokenToSend}&uid=${encodeURIComponent(uidToSend)}`
    const message = {
        from_email: "donotreply@samaritans-volunteers.org",
        from_name: "Samaritans",
        to: [{"email": recipient}],
        global_merge_vars: [{
            name: "recdashboard_url",
            content: url
        }],
        track_clicks: false
    }

    mandrillClient.messages.sendTemplate({
        template_name: "dashboard-finish-logging-in",
        template_content: {},
        message: message
    }, 
    result => {
        // On success
        console.log(result)
    }, e => {
        // On error
        console.log("An error occurred", e)
    })
}

const sendWelcomeEmail = (recipient) => {
    const message = {
        from_email: "donotreply@samaritans-volunteers.org",
        from_name: "Samaritans",
        to: [{"email": recipient}],
        global_merge_vars: [
            {
                name: "recdashboard_url",
                content: process.env.HOST
            },
            {
                name: "new_user_email",
                content: recipient
            }
        ],
        track_clicks: false
    }
    mandrillClient.messages.sendTemplate({
        template_name: "dashboard-welcome",
        template_content: {},
        message: message
    }, 
    result => {
        // On success
        console.log(result)
    }, e => {
        // On error
        console.log("An error occurred", e)
    })
}

module.exports = {
    sendLoginEmail: sendLoginEmail,
    sendWelcomeEmail: sendWelcomeEmail
}