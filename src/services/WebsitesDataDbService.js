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

    GetWebsitesData : (pageOffset) => {
        
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

    SearchWebsites : (searchTerm) => {
        
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
    }

}

export default WebsitesDataDbService;