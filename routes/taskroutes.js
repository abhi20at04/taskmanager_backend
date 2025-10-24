import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// ✅ GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new task
router.post("/", async (req, res) => {
  try {
    const { name, dueDate } = req.body;
    const newTask = new Task({ name, dueDate });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ DELETE by ID
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
