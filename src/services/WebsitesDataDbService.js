import { openDatabase } from 'react-native-sqlite-storage';

const errorCB = (err) => {
    console.log("SQL Error: " + err);
}

const successCB = () => {
    console.log("Database OPENED");
}

const openCB = () => {
    console.log("Database OPENED");
}

const db = openDatabase({ name: "WebsitesDB.db", createFromLocation: 1 }, openCB, errorCB);

const WebsitesDataDbService = {

    GetWebsitesData: (pageOffset) => {

        return new Promise((resolve, reject) => {
            try {
                db.transaction((tx) => {
                    tx.executeSql(`SELECT Distinct * from Websites limit 20 offset ${pageOffset}`,
                        null,
                        (tx, results) => {

                            const websites = results.rows.raw();
                            resolve(websites);
                        });
                });
            }
            catch (err) {
                reject(err);
            }
        })
    },

    SearchWebsites: (searchTerm) => {

        return new Promise((resolve, reject) => {
            try {
                db.transaction((tx) => {
                    tx.executeSql(`SELECT  * from Websites where Name LIKE '%${searchTerm}%' limit 20`,
                        null,
                        (tx, results) => {

                            const websites = results.rows.raw();
                            resolve(websites);
                        });
                });
            }
            catch (err) {
                reject(err);
            }
        })
    },

    CreateWebsitesDataTableIfNotExists: () => {
        return new Promise((resolve, reject) => {
            try {
                db.transaction((tx) => {
                    tx.executeSql(`CREATE TABLE IF NOT EXISTS CredentialsData (
                        id TEXT NOT NULL,
                        name TEXT NOT NULL,
                        username TEXT NOT NULL,
                        password TEXT NULL,
                        credentialsLogoId INTEGER NULL
                    )`,
                        null,
                        (tx, results) => {
                            const websites = results.rows.raw();
                            resolve(websites);
                        }, err => {
                            reject(err);
                        });
                });
            }
            catch (err) {
                reject(err);
            }
        })
    },

    InsertCredentialsData: ({id, name, username, password, credentialsLogoId}) => {

        const sqlQueryParamValues = `("${id}","${name}","${username}","${password}",${credentialsLogoId})`;
        return new Promise((resolve, reject) => {
            try {
                db.transaction((tx) => {
                    tx.executeSql(` INSERT INTO CredentialsData ( id, name, username, password, credentialsLogoId) VALUES${sqlQueryParamValues}`,
                        null,
                        (tx, results) => {
                            debugger;
                            const websites = results.rows.raw();
                            resolve(websites);
                        }, err => {
                            debugger;
                            reject(err);
                        });
                });
            }
            catch (err) {
                reject(err);
            }
        })
    },

    GetCredentialsData: () => {

        return new Promise((resolve, reject) => {
            try {
                db.transaction((tx) => {
                    tx.executeSql(` Select credentials.*, website.Logo as logo from CredentialsData credentials inner Join Websites website on credentials.credentialsLogoId=website.Id`,
                        null,
                        (tx, results) => {
                            const websites = results.rows.raw();
                            resolve(websites);
                        }, err => {
                            reject(err);
                        });
                });
            }
            catch (err) {
                reject(err);
            }
        })
    },

    DeleteCredential: (id) => {

        return new Promise((resolve, reject) => {
            try {
                db.transaction((tx) => {
                    tx.executeSql(` Delete from CredentialsData where id='${id}'`,
                        null,
                        (tx, results) => {
                            const websites = results.rows.raw();
                            resolve(websites);
                        }, err => {
                            reject(err);
                        });
                });
            }
            catch (err) {
                reject(err);
            }
        })
    },

}

export default WebsitesDataDbService;