/*  
    Citation for the following function:
    Date: 03NOV21
    Copied from: codehandbook.org
    Source URL: https://codehandbook.org/how-to-make-rest-api-calls-in-express-web-app/ 
*/

const request = require('request')

module.exports = {
    make_API_call : function(url){
        return new Promise((resolve, reject) => {
            request(url, { json: true }, (err, res, body) => {
              if (err) reject(err)
              resolve(body)
            });
        })
    }
}