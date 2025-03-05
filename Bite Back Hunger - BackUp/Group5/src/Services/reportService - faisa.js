const API_URL = "http://localhost:8080/reports";

export async function getReports() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function createReport(report) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report),
    });
    return response.json();
}
