async function main() {
  const httpClient = require('ipfs-http-client')

  // connect to the default API address http://localhost:5001
  const ipfs = httpClient.create()
  async function addFile(file_data) {
    const cid = function (data) {
      return ipfs
        .add(data)
        .then((cid) => {
          return cid;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const real_cid = cid(file_data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
    return real_cid;
  }

  const sendFileToNet = async (file) => {
    return await addFile(file);
  };
  async function getFile(cid) {
      const data = Uint8ArrayConcat(await all)
  }

  const getFileFromNet = async (ipfs) => {
    return await getFile("QmdxWocbtAV7uCTAQtJuTCgELWCM7anAZxmLgzQaptFAc1");
  };
  getFileFromNet(ipfs).then((r) => console.log(r));
  module.exports = { sendFileToNet, getFileFromNet };
}

main();
