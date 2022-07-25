const firebase = require('firebase');
const config = require('./config');
  
const db = firebase.initializeApp({
    credential: admin.credential.cert({
      "projectId": "ay-al-courses-platform",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCp2yZjt/J0Gp7X\nZo8YN170C3B8CHt41EaAWPpPyOTc9xz2OEGLyj3XM6/ll5PUmy9d4arCpAFiH+xy\nYfoJhdI26kFVkwLYn8kPxX+mglEcYZ14+CkTVi0cvy7XJaKA4Vk3S2rhcxbg5oNZ\n/40GSjtXbA8Ok1Mha9OtgIAyG59M3P966/joLbc3hz9TVHEIz+FIMXJt/6tZvRsm\nDW1bpVEwWw+nctA/LVz8F6VyOrSSCW50/T8hoIgyNoM54GeLQq/miYI3F/6d9xEN\n4B2xhKaDTBVUupEOH/Xwssw5et0hUoUK7gDR6T/UZAKJ0yU60BDCHq42Cnhuluba\nnsM/XtS3AgMBAAECggEATWHS1oE6Ct0J2nYV4OFw99uyTj+LCNwkllpzByAt6+EE\np8OvUOE9VSpuCzoIFkbwyGOD6RLQsoR6sw2h3O7De1MzmqnUFR6OegnvAsvB6h0q\noa7k/7M18C/FRi0WIIMJoyBPvBAzrxg1ZS4AcIonCMfpACnsKIC4OgYd4TYmV9xk\neYYqxToj4JuND8oiUs0AhXhxCkodxd/OyTyEBi+XbNfYINko9bQP9QiqSwQFu2CT\nOHYo0vYpvBgYcPVhj107zbhIf+1uvhqR0IQjH+aYSZmZnqT3qkAhj7vgaRH7B6Ok\nKtX3lG/BthSvlh5NcHvQpyCQXA+rFoucoG1uuotjsQKBgQDewxT0ynOgvXE0/Hym\n8MFdRUt56IzjJTMlLgGSe/gCDQ34McN5yC6EPZpIPa6//zfOdL8oHUb0gWtIrdS+\nxiptLg02VpSTBFvCpGmkr4xzPmUtroPi89/ReApjRgdeqa9xOPY5/uvUDlnqimr/\nXTQhazQJ9jNsrnnYbbueyBt8qQKBgQDDMzM2Q2Tm9fiZcsaoPlrZWtpSmHkij23X\nIIxatYeNOoJa1qO4qpYXBrsJGFW5xtph+Y9akEONaX4Dbn3lwqlVr+tOAprfo4HX\nc+Xjk35KZpLmyi1mb/6NKdtvDme0IMHnQYaTkpymuP6iBLCCaKwE2knlloiXNUHA\noZnZS8hCXwKBgQCHNN0pXyAjdhiaUo3OPd7/n6maCt5ImDGc5Xmq0XfMtuO9u2as\nKiahuUpFgrroah4TP6Uu0eZZTZwydt/kEx95OTRnwNFZEpInZ+d/P9X9tOdwfLYs\nMF2vJC8Z5k1e1ZtZG3vH48R752IIC4+6A3Y6unjRew/nbVcjWCdCzq5wUQKBgQCB\n/s4DPDytZ2/I2VwdXXFpQQ0WZn59mqFe3Ek8e5orXqTDVCAyckCEUzIqK2+jyh9T\nkjx65opmWbPXGzVy1wGolACTsj5r41ssHf4iYe6AI/F/C3PSvZD7d72wJxq/JfWc\nSdIS41e53IePZKocHxM4JBuEb4zFjm0cmUJ5KPPT5wKBgHp70da2jRClsjtKoeVD\nxbJ9vKrvAeGim03V5sTXkql0FDmcva2N7v2T6XkWTYTWP1lHlmxzFiVRJPbQYzRs\nsQBumB9XV1++bVG4tJ9FhA2JT5VGvKrL+TavaI4JAxb3kl0C2m7B5WtBNJOlowRb\nbz6g+rOKMtHwGm/rL7bDoJ1O\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-us5c8@ay-al-courses-platform.iam.gserviceaccount.com",
    }),
    databaseURL: "https://ay-al-courses-platform.firebaseio.com "
  });


// initializeApp(config.firebaseConfig);


module.exports = db;