const axios = require("axios").default;

const instance = axios.create({
  baseURL: "http://localhost:3002/api/person",
  headers: {
    "x-auth-token": process.env.REMEMBERME_API_KEY,
  },
});

const api = {
  getAll: function () {
    if (!process.env.REMEMBERME_API_KEY)
      return console.log("Your JWT key does not exist!");

    instance
      .get("/")
      .then(function (res) {
        for (let i = 0; i < res.data.length; i++) {
          console.info(res.data[i]);
        }
      })
      .catch(function (err) {
        console.error(err.response.data);
      });
  },

  getByName: function (name) {
    if (!process.env.REMEMBERME_API_KEY)
      return console.log("Your JWT key does not exist!");

    instance
      .get(`/get/${name}`)
      .then(function (res) {
        for (let i = 0; i < res.data.length; i++) {
          console.info(res.data[i]);
        }
      })
      .catch(function (err) {
        console.error(err.response.data);
      });
  },

  getById: function (id) {
    if (!process.env.REMEMBERME_API_KEY)
      return console.log("Your JWT key does not exist!");

    instance
      .get(`/${id}`)
      .then(function (res) {
        console.info(res.data);
      })
      .catch(function (err) {
        console.error(err.response.data);
      });
  },

  deleteById: function (id) {
    if (!process.env.REMEMBERME_API_KEY)
      return console.log("Your JWT key does not exist!");

    instance
      .delete(`/${id}`)
      .then(function (res) {
        console.info(res.data);
      })
      .catch(function (err) {
        console.error(err.response.data);
      });
  },

  edit: async function (id, answers) {
    const {
      name,
      metAt,
      place,
      phone,
      email,
      instagram,
      youtube,
      twitter,
      birth,
      age,
      likes,
      dislikes,
      occupation,
      lastseen,
      nextcontact,
      notes,
      tags,
      createdAt,
    } = answers;

    let changedLikes = "";
    let changedDislikes = "";
    let changedTags = "";

    if (likes) {
      changedLikes = [];
      changedLikes = likes.split(" ");
    }
    if (dislikes) {
      changedDislikes = [];
      changedDislikes = dislikes.split(" ");
    }
    if (tags) {
      changedTags = [];
      changedTags = tags.split(" ");
    }

    instance
      .put(`/${id}`, {
        name,
        metAt,
        place,
        contact: {
          phone,
          email,
          socialmedia: {
            instagram,
            youtube,
            twitter,
          },
        },
        birth,
        age,
        likes: changedLikes,
        dislikes: changedDislikes,
        occupation,
        lastseen,
        nextcontact,
        notes,
        tags: changedTags,
        createdAt,
      })
      .then(function (res) {
        console.info(res.data);
      })
      .catch(function (err) {
        console.error(err.response.data);
      });
  },

  post: function (answers) {
    const {
      name,
      metAt,
      place,
      phone,
      email,
      instagram,
      youtube,
      twitter,
      birth,
      age,
      likes,
      dislikes,
      occupation,
      lastseen,
      nextcontact,
      notes,
      tags,
      createdAt,
    } = answers;

    let changedLikes = [];
    let changedDislikes = [];
    let changedTags = [];

    if (likes) changedLikes = likes.split(",");
    if (dislikes) changedDislikes = dislikes.split(",");
    if (tags) changedTags = tags.split(",");

    instance
      .post(`/`, {
        name,
        metAt,
        place,
        contact: {
          phone,
          email,
          socialmedia: {
            instagram,
            youtube,
            twitter,
          },
        },
        birth,
        age,
        likes: changedLikes,
        dislikes: changedDislikes,
        occupation,
        lastseen,
        nextcontact,
        notes,
        tags: changedTags,
        createdAt,
      })
      .then(function (res) {
        console.info(res.data);
      })
      .catch(function (err) {
        console.error(err.response.data);
      });
  },
};

module.exports = api;
