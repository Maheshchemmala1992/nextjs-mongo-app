import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTopics = async () => {
    const res = await fetch("/api/topics");
    const data = await res.json();
    setTopics(data);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Failed");
      setTitle("");
      setDescription("");
      await fetchTopics();
    } catch (e) {
      setError("Failed to add topic");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto" }}>
      <h1>Next.js + MongoDB</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          style={{ width: "100%", padding: 10, marginBottom: 8 }}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          style={{ width: "100%", padding: 10, marginBottom: 8, minHeight: 120 }}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button disabled={loading} type="submit">{
          loading ? "Adding..." : "Add Topic"
        }</button>
        {error && <p style={{ color: "crimson" }}>{error}</p>}
      </form>

      <h2>Topics</h2>
      <ul>
        {topics.map((t) => (
          <li key={t._id}>
            <strong>{t.title}</strong>: {t.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
