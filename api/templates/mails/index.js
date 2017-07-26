module.exports = {

  createUser (user) {
    return {
      from: '"Bucket links" <no-response@bucketlink.com>',
      to: `${user.email}, ${user.email}`,
      subject: 'Bienvenue dans la communauté BucketLink',
      text: 'Votre compte à bien été crée.',
      html: `
        <p>Email: ${user.email}</p>
        <p>Firstname: ${user.firstname}</p>
      `
    }
  }

}