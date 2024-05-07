import express from "express";
// import mysql from "mysql";
import mysql from "mysql2";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello!");
});

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Up and runing DBS");

  // Insert products

  // const queryInsertProducts = `
  //   INSERT INTO newtech.products (product_name)
  //   VALUES ("erikson"), ("samsung 10"),("alcatel 5x"), ("blueberry")
  // `;

  // const queryInsertUsers = `
  //   INSERT INTO newtech.users (username, email)
  //   VALUES ("alex", "alex@gmail"), ("john","john@gmail")
  // `;

  // const queryInsertOrders = `
  //   INSERT INTO newtech.orders (order_user_id, order_product_id)
  //   VALUES (2, 1), (2, 4), (2,5)
  // `;

  const queryGetUsersProducts = `
    select username, product_name from newtech.orders
      left join newtech.users on orders.order_user_id = users.user_id
      left join newtech.products on orders.order_product_id = products.product_id;
  `;

  const queryNumberOfOrdersPerUser = `
    select count(user_id) as number_of_orders, username from newtech.orders
      left join newtech.users on orders.order_user_id = users.user_id
      left join newtech.products on orders.order_product_id = products.product_id
    GROUP BY user_id;
  `;

  con.query(queryNumberOfOrdersPerUser, (err, res) => {
    console.log(res);
  });
});

app.listen(3000, () => {
  console.log("Let's rock and roll");
});
