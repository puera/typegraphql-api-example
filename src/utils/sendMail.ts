import nodemailer from 'nodemailer'

interface PropsEmail {
  email: string
  url: string
}

export async function sendEmail({email, url}: PropsEmail) {
  const account = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass
    }
  })

  const mailOptions = {
    from: "Test <test@teste.com>",
    to: email,
    subject: "Heelo",
    text: "Heelow World",
    html: `<a href="${url}">${url}</a>`
  }

  const info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId)

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}