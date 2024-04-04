import { Router } from "express";
import { v4 } from "uuid";

const jobsRoutes = Router();

const jobs = [
  {
    id: "ac39a0ae-b5ef-4de0-9810-b022b85f9f78",
    title: "Desenvolvedor Front-end",
    knowledge: ["HTML", "CSS", "JavaScript"],
    remuneration: 3000,
    benefits: ["Vale transporte", "Vale refeição"],
    status: false,
  },
  
];

/* 
id: uuid,
titulo: string,
conhecimentos: string/string[]
remuneracao: float/number,
beneficios: string/string[],
status: boolean,
*/

jobsRoutes.get("/", async (req, res) => {
  if (jobs.length <= 0) {
    return res.status(404).render("no-jobs");
  }

  console.log(jobs);
  return res.status(200).render("jobs", { jobs });
});

jobsRoutes.get("/find", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).render("not-found");
  }

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).render("not-found");
  }

  return res.status(200).render("job", { job });
});

jobsRoutes.get("/create-job", async (req, res) => {
  return res.render("new-job");
});

jobsRoutes.post("/", async (req, res) => {
  const { title, knowledge, remuneration, benefits, status } = req.body;

  if (!title || !knowledge || !remuneration || !benefits) {
    return res.status(400).send("Please fill all fields");
  }

  console.log(status)

  const job = {
    id: v4(),
    title,
    knowledge: knowledge.split(",").map((knowledge) => knowledge.trim()),
    remuneration: parseFloat(remuneration),
    benefits: benefits.split(",").map((benefit) => benefit.trim()),
    status: status === "true" ? true : false,
  };

  await jobs.push(job);

  return res.status(200).redirect("/jobs");
});

jobsRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, knowledge, remuneration, benefits, status } = req.body;

  const jobIndex = jobs.findIndex((job) => job.id === id);

  if (jobIndex < 0) {
    return res.status(404).send("Job not found");
  }

  jobs[jobIndex] = {
    id,
    title,
    knowledge,
    remuneration,
    benefits,
    status: status === "on" ? "Disponível" : "Indisponível",
  };

  return res.status(200).redirect("/jobs");
});

jobsRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).send("Job not found");
  }

  jobs.splice(job, 1);

  return res.status(200).send(job.title + " deleted");
});

export { jobsRoutes };

const req = {
  body: {
    id: 10,
    title: "Desenvolvedor Front-end",
    knowledge: ["HTML", "CSS", "JavaScript"],
    remuneration: 3000,
    benefits: ["Vale transporte", "Vale refeição"],
    status: true,
  }
}

const { title } = req.body;