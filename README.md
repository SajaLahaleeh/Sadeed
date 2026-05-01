# 🚀 Sadeed | سديد 
### *Smart Financial Guidance for Everyone*


**Sadeed** (سديد) is an intuitive, AI-powered web application designed to simplify personal finance. It bridges the gap between complex accounting and everyday spending by transforming financial data into a simple, actionable **Traffic Light System**.

---

## 💡 The Problem
Many individuals, especially those who are unbanked or receive cash payments, find traditional financial apps too complex. Managing monthly "Cash Flow" and predicting upcoming bills often leads to unexpected financial deficits.

## 🌟 Our Solution
Sadeed simplifies wealth management through:
* **🚦 Traffic Light Visualization:** Instant status updates **Green** (Safe), **Yellow** (Caution), and **Red** (Deficit Alert).
* **🔮 Predictive Spending:** AI driven alerts for upcoming rent, utilities, and subscriptions *before* they happen.
* **🎙️ Voice-First Entry:** Seamless voice-to-text logging for bills, perfect for on-the-go tracking and cash-based earners.
* **⏳ Labor-Value Calculator:** A unique awareness tool that asks: *"Is this purchase worth X hours of your hard work?"*

---

## 🛠️ Tech Stack (Proposed)
* **Frontend:** React.js / Next.js
* **Backend:** Java / Springboot 
* **Database:** PostgreSQL / Firebase
* **AI/ML:** Predictive modeling for expense forecasting

---

## 🚀 Future Roadmap
* **SME Integration:** Dedicated bookkeeping tools for small business owners.
* **Freelancer Suite:** A unified dashboard to manage payments (PayPal, Stripe, Crypto) with an automatic fee calculator.

---

## 💻 How to Run Locally

Follow these steps to get Sadeed up and running on your machine.

### 📋 Prerequisites

Make sure you have the following installed:

- **Git** – [Download here](https://git-scm.com/)
- **Node.js** (v18 or higher) – [Download here](https://nodejs.org/)
- **npm** or **yarn** – Comes with Node.js
- **Java JDK 17+** – [Download here](https://www.oracle.com/java/technologies/downloads/)
- **PostgreSQL** (optional, for production) – [Download here](https://www.postgresql.org/download/)

### 🔧 Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/SajaLahaleeh/Sadeed.git
cd sadeed

# 2. Install frontend dependencies
cd frontend
npm install

# 3. Install backend dependencies
cd ../backend
./mvnw install

# 4. Run backend server (keep this terminal open)
cd ../backend
./mvnw spring-boot:run

# 5. Open a new terminal and run frontend
cd ../frontend/my-app
npm start

---

## 👥 Team
* **[Sajalahaleeh]** - Backend Java Developer
* **[mriana9]** - Frontend Developer
