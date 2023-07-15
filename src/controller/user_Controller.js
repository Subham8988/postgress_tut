const client = require('../config/db_Config');

//add user
const addUser = (async (req, res) => {
  try {
    const query = {
      text: `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
      values: [req.body.name, req.body, email],
    };
    const rows = await client.query(query);
    res.status(201).send('done')
  } catch (error) {
    res.status(500).send(`${error}`)
  }

});


// form upload
const formData = async (req, res) => {
  try {
    const pathname = req.params.form_name;
    if (pathname && pathname.trim() !== '') {
      // const created_date = new Date().toLocaleString();
      const checkQuery = {
        text: `SELECT COUNT(*) FROM form_json WHERE form_name = $1`,
        values: [pathname]
      };
      const { rows } = await client.query(checkQuery);
      const formCount = parseInt(rows[0].count);
      if (formCount > 0) {

        return res.status(404).send({ status: 404, message: 'Form name already exists' });
      }
      const query = {
        text: `INSERT INTO form_json (form_name, data, status)
                 VALUES ($1, $2, $3)`,
        values: [pathname, req.body.data, req.body.status]
      };

      await client.query(query);
      res.status(201).send({ status: 200, result: "form save" });
    } else {
      res.status(400).send({ status: 400, message: 'Please check URL' });
    }
  } catch (error) {
    res.status(500).send(`subhamm  eroorr`);
  }
};

// get form value 
const get_form_data = async (req, res) => {
  try {
    const pathname = req.params.form_name;
    if (pathname && pathname.trim() !== '') {
      const checkQuery = {
        text: `SELECT COUNT(*) FROM form_json WHERE form_name = $1`,
        values: [pathname]
      };
      const { rows } = await client.query(checkQuery);
      const formCount = parseInt(rows[0].count);
      if (formCount > 0) {
        const query = {
          text: `select * from form_json where form_name='${pathname}'`,

        };
        var row = await client.query(query);
        res.status(200).send({ status: 200, form_data: row.rows });
      }
      else {
        res.status(404).send({ status: 404, result: "no data found " })
      }

    } else {
      res.status(400).send({ status: 400, message: 'Please check URL' });
    }

  } catch (error) {
    console.log(error);
    res.status(500).send(`${error}`);
  }
}

// form list
const form_list = async (req, res) => {
  try {
    const query = {
      text: `select * from form_json `,
    };
    var row = await client.query(query);
    res.status(200).send({ status: 200, form_list: row.rows });
  } catch (error) {
    console.log(error);
    res.status(500).send(`${error}`);
  }
}


// delete  form  json
const delete_form = async (req, res) => {
  try {
    const pathname = req.params.form_name;
    if (pathname && pathname.trim() !== '') {
      const checkQuery = {
        text: `SELECT COUNT(*) FROM form_json WHERE form_name = $1`,
        values: [pathname]
      };
      const { rows } = await client.query(checkQuery);
      const formCount = parseInt(rows[0].count);
      if (formCount <= 0) {

        res.status(404).send({ status: 404, message: 'Form name not exists' });
      } else {
        const delete_query = {
          text: `DELETE FROM form_json WHERE form_name = $1`,
          values: [pathname]
        }
        const resQuery = await client.query(delete_query);
        console.log('resQuery',resQuery);
        res.status(200).send({ status: 200, result: `form with form name ${pathname} deleted  sucess fully` })
      }
    }
    else { res.status(400).send({ status: 400, result: ` check url ` }) }
  } catch (error) {
    res.status(500).send({ status: 500, result: `${error}` })
  }
}


module.exports = { addUser, formData, get_form_data, form_list, delete_form }