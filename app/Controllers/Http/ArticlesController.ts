// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";

export default class ArticlesController {
  public async view({ view }) {
    const articles = await Database.query() // 👈 gives an instance of select query builder
      .from("articles")
      .select("*");
    // console.log(articles);
    return view.render("article.view", { articles });
  }
  public async create({ view }) {
    return view.render("article.create");
  }
  public async store({ request, response }) {
    const { title, content, image } = request.body();
    await Database.table("articles").insert({
      title,
      content,
      image,
      slug: "abcdef",
    });

    return response.redirect().back();
  }
}
