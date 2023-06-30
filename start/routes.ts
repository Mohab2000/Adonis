import Route from "@ioc:Adonis/Core/Route";
import Database from "@ioc:Adonis/Lucid/Database";

Route.get("/", async ({ view }) => {
  return view.render("welcome");
});

Route.get("/news", async ({ view }) => {
  //fetch data from db
  const articles = await Database.query() // 👈 gives an instance of select query builder
    .from("articles")
    .select("*");
  // console.log(articles);
  return view.render("news.view", { articles });
}).as("news_view");

Route.post("/news", ({ response }) => {
  // const { email, password } = request.body();
  return response.redirect("/news");
}).as("news.create");

Route.patch("/news/:id", ({ params }) => {
  return { params };
}).as("news.update");

Route.delete("/news/:id", ({ params }) => {
  return { params };
})
  .where("id", { match: /^[0-9]+$/, cast: (id) => Number(id) })
  .as("news.delete");
