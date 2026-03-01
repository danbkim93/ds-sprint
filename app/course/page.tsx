"use client";

import { useState, useEffect } from "react";

const COURSE_PASSWORD = "dssprint2026";

const days = [
  {
    day: "Day 1",
    title: "Statistics That Always Show Up",
    topics: ["Mean, Median, Variance", "Normal Distribution", "CLT", "Hypothesis Testing", "p-values", "Type I & II Errors"],
    content: [
      {
        type: "section",
        title: "1. Mean, Median & Standard Deviation",
        body: `**Mean** — the average. Sensitive to outliers.\n**Median** — the middle value. Use this when data is skewed.\n**Standard Deviation** — measures spread. High std dev = data is spread out, less predictable.\n\n💡 Interview tip: "Why use median over mean?" → When there are outliers (e.g. income, house prices).`,
      },
      {
        type: "section",
        title: "2. Normal Distribution",
        body: `Bell-shaped and symmetric. Mean = Median = Mode.\n\n**68-95-99.7 Rule:**\n- 68% of data falls within 1 std dev\n- 95% within 2 std devs\n- 99.7% within 3 std devs\n\n💡 Interview tip: Many ML models assume normality. Know when your data violates this.`,
      },
      {
        type: "section",
        title: "3. Central Limit Theorem (CLT)",
        body: `As sample size increases, the distribution of sample means approaches normal — regardless of the original distribution.\n\n💡 Interview tip: "Why does CLT matter?" → It's the foundation of hypothesis testing. It lets us use normal-based tests even when raw data isn't normal.`,
      },
      {
        type: "section",
        title: "4. Hypothesis Testing",
        body: `**H₀ (Null hypothesis)** — no effect, no difference. The status quo.\n**H₁ (Alternative hypothesis)** — there is an effect.\n\nYou either **reject H₀** or **fail to reject H₀**. Never say "we proved H₁."\n\n💡 Interview tip: Always frame results as "we reject or fail to reject the null."`,
      },
      {
        type: "section",
        title: "5. p-value",
        body: `The probability of seeing your result (or more extreme) if the null hypothesis were true.\n\n- p < 0.05 → reject null (statistically significant)\n- p > 0.05 → fail to reject null\n\n💡 Interview tip: "p=0.03 means if H₀ were true, there's only a 3% chance of seeing this result by chance."`,
      },
      {
        type: "section",
        title: "6. Type I vs Type II Errors",
        body: `**Type I Error (False Positive)** — rejected a true null hypothesis.\n**Type II Error (False Negative)** — failed to reject a false null hypothesis.\n\n💡 Interview tip: "Which is worse?" → Depends on context. In medical testing, Type II (missing a disease) is worse. In spam filters, Type I (blocking legit email) might be worse.`,
      },
      {
        type: "cheatsheet",
        title: "Day 1 Cheat Sheet",
        items: [
          { label: "Mean", value: "Average — sensitive to outliers" },
          { label: "Median", value: "Middle value — use when data is skewed" },
          { label: "Std Dev", value: "Spread of data around the mean" },
          { label: "Normal Dist", value: "Bell curve — 68/95/99.7 rule" },
          { label: "CLT", value: "Sample means → normal as n increases" },
          { label: "H₀", value: "Null hypothesis — no effect" },
          { label: "p-value", value: "Prob of result if H₀ true. p<0.05 = significant" },
          { label: "Type I", value: "False positive — rejected true H₀" },
          { label: "Type II", value: "False negative — missed real effect" },
        ],
      },
      {
        type: "questions",
        title: "Practice Questions",
        items: [
          {
            q: "What's the difference between mean and median? When would you use each?",
            a: "Mean for symmetric data without outliers. Median when data is skewed or has outliers — like income or house prices.",
          },
          {
            q: "What is a p-value? Explain it to a non-technical stakeholder.",
            a: "\"If there were actually no real effect, there's only a X% chance we'd see results this extreme by random chance alone.\"",
          },
          {
            q: "What's the difference between Type I and Type II errors?",
            a: "Type I = false positive (flagging something that isn't real). Type II = false negative (missing something real). Which matters more depends on the cost of each mistake.",
          },
          {
            q: "Why does the Central Limit Theorem matter in practice?",
            a: "It lets us use normal distribution-based tests even when the underlying data isn't normal, as long as our sample is large enough.",
          },
          {
            q: "You run an A/B test and get p=0.07. What do you tell your manager?",
            a: "\"We didn't find a statistically significant result at the 0.05 level. The effect may exist but we don't have enough evidence — consider running longer or increasing sample size.\"",
          },
        ],
      },
    ],
  },
  {
    day: "Day 2",
    title: "SQL Patterns in 80% of Interviews",
    topics: ["Execution Order", "Aggregations", "WHERE vs HAVING", "JOINs", "Window Functions", "CTEs"],
    content: [
      {
        type: "section",
        title: "1. The Big 5 Clauses (Execution Order)",
        body: `FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY\n\n💡 Interview tip: Interviewers love asking "what order does SQL execute?" This is the answer.`,
      },
      {
        type: "section",
        title: "2. Aggregations",
        body: `Know these cold: COUNT, SUM, AVG, MAX, MIN\n\nSELECT department,\n       COUNT(*)   AS total_employees,\n       AVG(salary) AS avg_salary,\n       MAX(salary) AS top_salary\nFROM employees\nGROUP BY department;\n\n💡 Always pair aggregations with GROUP BY.`,
      },
      {
        type: "section",
        title: "3. WHERE vs HAVING",
        body: `**WHERE** — filters rows BEFORE grouping.\n**HAVING** — filters groups AFTER GROUP BY.\n\n-- Departments with more than 10 employees\nSELECT department, COUNT(*) AS total\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 10;\n\n💡 Interview tip: "Use HAVING when filtering on an aggregated value."`,
      },
      {
        type: "section",
        title: "4. JOINs",
        body: `**INNER JOIN** — only matching rows from both tables.\n**LEFT JOIN** — all rows from left, NULLs where no match on right.\n**RIGHT JOIN** — all rows from right, NULLs where no match on left.\n**FULL OUTER JOIN** — all rows from both tables.\n\nSELECT e.name, d.department_name\nFROM employees e\nLEFT JOIN departments d ON e.dept_id = d.id;\n\n💡 Interview tip: LEFT JOIN is the most common in analytics. Know it cold.`,
      },
      {
        type: "section",
        title: "5. Window Functions (Most Asked Advanced Topic)",
        body: `-- ROW_NUMBER: rank within a partition\nSELECT name, department, salary,\n       ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank\nFROM employees;\n\n-- Running total\nSELECT date, revenue,\n       SUM(revenue) OVER (ORDER BY date) AS running_total\nFROM sales;\n\n-- LAG: compare to previous row\nSELECT date, revenue,\n       LAG(revenue, 1) OVER (ORDER BY date) AS prev_revenue\nFROM sales;\n\n💡 Interview tip: Know ROW_NUMBER, RANK, SUM, LAG, LEAD — they come up in almost every senior DS interview.`,
      },
      {
        type: "section",
        title: "6. CTEs (Common Table Expressions)",
        body: `WITH top_earners AS (\n  SELECT name, salary, department\n  FROM employees\n  WHERE salary > 100000\n)\nSELECT department, COUNT(*) AS count\nFROM top_earners\nGROUP BY department;\n\n💡 Interview tip: CTEs make complex queries readable. Use them instead of nested subqueries — interviewers notice.`,
      },
      {
        type: "cheatsheet",
        title: "Day 2 Cheat Sheet",
        items: [
          { label: "Exec order", value: "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY" },
          { label: "WHERE", value: "Filter rows before grouping" },
          { label: "HAVING", value: "Filter groups after GROUP BY" },
          { label: "INNER JOIN", value: "Only matching rows" },
          { label: "LEFT JOIN", value: "All left rows, NULLs where no match" },
          { label: "ROW_NUMBER()", value: "Unique rank within partition" },
          { label: "RANK()", value: "Same rank for ties, skips next" },
          { label: "LAG/LEAD", value: "Access previous/next row values" },
          { label: "CTE", value: "WITH name AS (...) — cleaner than subqueries" },
        ],
      },
      {
        type: "questions",
        title: "Practice Questions",
        items: [
          {
            q: "What's the difference between WHERE and HAVING?",
            a: "WHERE filters individual rows before grouping. HAVING filters groups after GROUP BY. Use HAVING when filtering on aggregated values like COUNT or SUM.",
          },
          {
            q: "Write a query to find the top earner in each department.",
            a: "WITH ranked AS (SELECT name, department, salary, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn FROM employees) SELECT name, department, salary FROM ranked WHERE rn = 1;",
          },
          {
            q: "What's the difference between RANK() and ROW_NUMBER()?",
            a: "ROW_NUMBER gives unique sequential numbers even for ties. RANK gives the same number to ties but skips the next rank (1,1,3). DENSE_RANK gives same number to ties without skipping (1,1,2).",
          },
          {
            q: "Write a query to calculate month-over-month revenue change.",
            a: "SELECT month, revenue, LAG(revenue) OVER (ORDER BY month) AS prev_month, revenue - LAG(revenue) OVER (ORDER BY month) AS change FROM monthly_revenue;",
          },
          {
            q: "What is a CTE and why use it over a subquery?",
            a: "A CTE (WITH clause) is a named temporary result set. It's easier to read, can be referenced multiple times, and makes debugging easier than nested subqueries.",
          },
        ],
      },
    ],
  },
  {
    day: "Day 3",
    title: "Python & Pandas Must-Knows",
    topics: ["Python Basics", "Inspecting Data", "Filtering", "Missing Data", "GroupBy", "Apply & Map", "Merging"],
    content: [
      {
        type: "section",
        title: "1. Python Basics Interviewers Assume You Know",
        body: `# List comprehension\nsquares = [x**2 for x in range(10)]\n\n# Dictionary comprehension\nfreq = {word: text.count(word) for word in text.split()}\n\n# Lambda\ndouble = lambda x: x * 2\n\n# Map & Filter\ndoubled = list(map(lambda x: x * 2, numbers))\nevens = list(filter(lambda x: x % 2 == 0, numbers))\n\n💡 Interview tip: List comprehensions show fluency. Use them over for-loops when possible.`,
      },
      {
        type: "section",
        title: "2. Loading & Inspecting Data",
        body: `import pandas as pd\n\ndf = pd.read_csv("data.csv")\n\ndf.head()       # first 5 rows\ndf.shape        # (rows, columns)\ndf.info()       # column types, nulls\ndf.describe()   # stats summary\ndf.columns      # column names\ndf.dtypes       # data types\n\n💡 Always start EDA with these. Interviewers expect you to mention them.`,
      },
      {
        type: "section",
        title: "3. Selecting & Filtering",
        body: `# Select column\ndf["salary"]\ndf[["name", "salary"]]\n\n# Filter rows\ndf[df["salary"] > 100000]\ndf[(df["salary"] > 100000) & (df["department"] == "Engineering")]\n\n# loc: label-based\ndf.loc[df["age"] > 30, ["name", "salary"]]\n\n# iloc: position-based\ndf.iloc[0:5, 0:3]\n\n💡 Interview tip: Know the difference between loc (labels) and iloc (positions).`,
      },
      {
        type: "section",
        title: "4. Handling Missing Data",
        body: `df.isnull().sum()                        # count nulls per column\ndf.dropna()                              # drop rows with any null\ndf.dropna(subset=["salary"])             # drop where salary is null\ndf.fillna(0)                             # fill nulls with 0\ndf["salary"].fillna(df["salary"].mean()) # fill with mean\n\n💡 Interview tip: "How do you handle missing data?" → Always explain WHY you choose drop vs fill.`,
      },
      {
        type: "section",
        title: "5. GroupBy & Aggregation",
        body: `# Single aggregation\ndf.groupby("department")["salary"].mean()\n\n# Multiple aggregations\ndf.groupby("department").agg(\n    avg_salary=("salary", "mean"),\n    total_employees=("name", "count"),\n    max_salary=("salary", "max")\n)\n\n💡 This is the pandas equivalent of SQL GROUP BY. Know it cold.`,
      },
      {
        type: "section",
        title: "6. Apply & Map",
        body: `# apply: row or column level function\ndf["salary_category"] = df["salary"].apply(\n    lambda x: "high" if x > 100000 else "low"\n)\n\n# map: element-wise on a series\ndf["dept_code"] = df["department"].map({"Engineering": 1, "Sales": 2})\n\n💡 Use map for simple substitutions, apply for custom logic.`,
      },
      {
        type: "section",
        title: "7. Merging DataFrames",
        body: `# Inner merge (only matching rows)\npd.merge(df1, df2, on="employee_id", how="inner")\n\n# Left merge (all of df1)\npd.merge(df1, df2, on="employee_id", how="left")\n\n💡 Interview tip: Same logic as SQL JOINs — interviewers often ask you to translate between the two.`,
      },
      {
        type: "cheatsheet",
        title: "Day 3 Cheat Sheet",
        items: [
          { label: "Inspect", value: "df.head() / df.info() / df.describe()" },
          { label: "Filter", value: "df[df['col'] > val]" },
          { label: "loc", value: "Label-based selection" },
          { label: "iloc", value: "Position-based selection" },
          { label: "Nulls", value: "df.isnull().sum() / fillna() / dropna()" },
          { label: "GroupBy", value: "df.groupby('col').agg(...)" },
          { label: "Apply", value: "df['col'].apply(lambda x: ...)" },
          { label: "Map", value: "df['col'].map({'a': 1, 'b': 2})" },
          { label: "Merge", value: "pd.merge(df1, df2, on=, how=)" },
        ],
      },
      {
        type: "questions",
        title: "Practice Questions",
        items: [
          {
            q: "What's the difference between loc and iloc?",
            a: "loc is label-based — you use column/index names. iloc is position-based — you use integer positions. Example: df.loc[0, 'salary'] vs df.iloc[0, 2].",
          },
          {
            q: "How do you handle missing values in a dataset?",
            a: "First check with df.isnull().sum(). Then decide: drop rows if missing data is random and small (<5%). Fill with mean/median for numerical columns. Fill with mode for categorical. Always explain the trade-off.",
          },
          {
            q: "How do you find the top 3 earners in each department?",
            a: "df.groupby('department').apply(lambda x: x.nlargest(3, 'salary')).reset_index(drop=True)",
          },
          {
            q: "What's the difference between apply and map?",
            a: "map works element-wise on a Series. apply works on a Series or DataFrame and can take more complex functions. Use map for simple substitutions, apply for custom logic.",
          },
          {
            q: "How do you merge two DataFrames and what are the join types?",
            a: "Use pd.merge(df1, df2, on='key', how='inner/left/right/outer'). Same logic as SQL JOINs — inner keeps only matches, left keeps all of df1, right keeps all of df2, outer keeps everything.",
          },
        ],
      },
    ],
  },
  {
    day: "Day 4",
    title: "ML Concepts — Clear Enough to Teach",
    topics: ["ML Workflow", "Supervised vs Unsupervised", "Bias vs Variance", "Train/Test Split", "Cross-Validation", "Evaluation Metrics", "Regularization", "Feature Engineering"],
    content: [
      {
        type: "section",
        title: "1. The ML Workflow",
        body: `1. Define the problem\n2. Collect & clean data\n3. EDA (exploratory data analysis)\n4. Feature engineering\n5. Train / test split\n6. Train model\n7. Evaluate\n8. Tune & iterate\n\n💡 Interview tip: Always frame your answer around this workflow. It shows structured thinking.`,
      },
      {
        type: "section",
        title: "2. Supervised vs Unsupervised Learning",
        body: `**Supervised** — has labels, goal is to predict output. Examples: regression, classification.\n**Unsupervised** — no labels, goal is to find structure. Examples: clustering, PCA.\n\n💡 Interview tip: "Give an example of each?" → Supervised: predicting churn. Unsupervised: customer segmentation.`,
      },
      {
        type: "section",
        title: "3. Bias vs Variance",
        body: `**High Bias (Underfitting)** — model too simple, misses patterns in training data.\n**High Variance (Overfitting)** — model memorizes training data, fails on new data.\n\nSimple model → high bias, low variance\nComplex model → low bias, high variance\n\n💡 Interview tip: "How do you fix overfitting?" → More data, regularization, simpler model, cross-validation.`,
      },
      {
        type: "section",
        title: "4. Train / Validation / Test Split",
        body: `from sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\n**Train** — model learns from this.\n**Validation** — tune hyperparameters.\n**Test** — final evaluation, touch once.\n\n💡 Interview tip: Never evaluate on training data. Test set is sacred — only use it once.`,
      },
      {
        type: "section",
        title: "5. Cross-Validation",
        body: `from sklearn.model_selection import cross_val_score\n\nscores = cross_val_score(model, X, y, cv=5)\nprint(scores.mean())\n\nSplits data into k folds, trains on k-1, tests on 1, rotates.\nMore reliable than a single train/test split.\nStandard: 5-fold or 10-fold.\n\n💡 Interview tip: "Why use cross-validation?" → Reduces variance in performance estimate, especially with small datasets.`,
      },
      {
        type: "section",
        title: "6. Evaluation Metrics",
        body: `**Classification:**\nAccuracy  = correct / total\nPrecision = TP / (TP + FP) → of predicted positives, how many are real?\nRecall    = TP / (TP + FN) → of actual positives, how many did we catch?\nF1 Score  = 2 * (Precision * Recall) / (Precision + Recall)\nAUC-ROC   = model's ability to distinguish classes\n\n**Regression:**\nMAE  = mean absolute error (easy to interpret)\nMSE  = mean squared error (penalizes large errors)\nRMSE = root MSE (same unit as target)\nR²   = % of variance explained by model\n\n💡 Interview tip: Precision when FP costly (spam). Recall when FN costly (cancer detection).`,
      },
      {
        type: "section",
        title: "7. Regularization",
        body: `**L1 (Lasso)** — shrinks some coefficients to exactly zero → feature selection, sparse model.\n**L2 (Ridge)** — shrinks coefficients toward zero but not exactly → handles multicollinearity.\n\n💡 Interview tip: L1 does feature selection. L2 keeps all features but small. Use L1 when you suspect many irrelevant features.`,
      },
      {
        type: "section",
        title: "8. Feature Engineering",
        body: `# Scaling (important for distance-based models)\nfrom sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X_train)\n\n# Encoding categorical variables\npd.get_dummies(df["category"])  # one-hot encoding\n\n💡 Interview tip: Always scale for KNN, SVM, neural networks. Tree-based models don't need scaling.`,
      },
      {
        type: "cheatsheet",
        title: "Day 4 Cheat Sheet",
        items: [
          { label: "Bias", value: "Underfitting — model too simple" },
          { label: "Variance", value: "Overfitting — model too complex" },
          { label: "Fix overfit", value: "More data, regularization, simpler model" },
          { label: "Cross-val", value: "k-fold, more reliable performance estimate" },
          { label: "Precision", value: "TP/(TP+FP) — use when FP is costly" },
          { label: "Recall", value: "TP/(TP+FN) — use when FN is costly" },
          { label: "F1", value: "Balance of precision and recall" },
          { label: "L1 (Lasso)", value: "Feature selection, sparse model" },
          { label: "L2 (Ridge)", value: "Shrink all coefficients, handles multicollinearity" },
          { label: "Scaling", value: "Required for KNN, SVM, Neural Nets. Not for trees." },
        ],
      },
      {
        type: "questions",
        title: "Practice Questions",
        items: [
          {
            q: "What is the bias-variance tradeoff?",
            a: "Bias = error from wrong assumptions (underfitting). Variance = error from sensitivity to training data (overfitting). Increasing model complexity reduces bias but increases variance. The goal is to find the balance that minimizes total error.",
          },
          {
            q: "When would you use precision vs recall?",
            a: "Precision when false positives are costly — spam filter (don't want to block real emails). Recall when false negatives are costly — cancer screening (don't want to miss a real case).",
          },
          {
            q: "What's the difference between L1 and L2 regularization?",
            a: "L1 (Lasso) drives some coefficients to exactly zero — does feature selection. L2 (Ridge) shrinks all toward zero but keeps them. Use L1 when you suspect many irrelevant features. Use L2 when all features matter.",
          },
          {
            q: "Why use cross-validation instead of a single train/test split?",
            a: "A single split can be lucky or unlucky. Cross-validation rotates through k folds giving a more reliable performance estimate — especially important with small datasets.",
          },
          {
            q: "Your model has 95% accuracy but your stakeholder isn't happy. Why?",
            a: "If the dataset is imbalanced (e.g. 95% negative class), a model that always predicts negative gets 95% accuracy while being useless. Look at precision, recall, and F1 — especially for the minority class.",
          },
        ],
      },
    ],
  },
  {
    day: "Day 5",
    title: "Algorithm Cheat Sheet",
    topics: ["When to Use What", "Linear & Logistic Regression", "Random Forest", "XGBoost", "KNN", "SVM", "K-Means", "Decision Framework"],
    content: [
      {
        type: "section",
        title: "1. The Most Important Question",
        body: `Interviewers don't expect you to memorize math. They want to know:\n\n**What problem are you solving?** (classification, regression, clustering)\n**What are your data characteristics?** (size, features, linearity)\n**What are the trade-offs?** (speed, interpretability, accuracy)\n\n💡 Always frame your algorithm choice as a decision, not a fact.`,
      },
      {
        type: "section",
        title: "2. Linear & Logistic Regression",
        body: `**Linear Regression** → predict continuous value (salary, price)\n**Logistic Regression** → predict probability / binary classification (churn: yes/no)\n\nFast, interpretable, good baseline.\nAssumes linear relationship.\nSensitive to outliers.\n\n💡 Interview tip: Always start with linear/logistic as your baseline. Explain why you'd move to something more complex.`,
      },
      {
        type: "section",
        title: "3. Random Forest",
        body: `Ensemble of decision trees (bagging).\nEach tree trained on random subset of data + features.\nFinal prediction = majority vote (classification) or average (regression).\n\n**When to use:**\n- Medium-large tabular datasets\n- When you need good accuracy with minimal tuning\n- When interpretability matters somewhat\n\n💡 Interview tip: Random Forest is your safe default for tabular data. Hard to go wrong.`,
      },
      {
        type: "section",
        title: "4. XGBoost / Gradient Boosting",
        body: `Ensemble of trees built sequentially — each corrects previous errors.\nGenerally more accurate than Random Forest.\nMore tuning required.\n\n**When to use:**\n- High accuracy needed\n- Structured/tabular data\n- When you have time to tune\n\n💡 Interview tip: "XGBoost vs Random Forest?" → XGBoost usually wins on accuracy. Random Forest is faster to tune and less prone to overfitting.`,
      },
      {
        type: "section",
        title: "5. KNN & SVM",
        body: `**KNN (K-Nearest Neighbors)**\n- Predicts based on k closest data points\n- No training phase, slow at prediction time\n- Always scale features first\n- Use for: small datasets, recommendation systems\n\n**SVM (Support Vector Machine)**\n- Finds optimal hyperplane separating classes\n- Works well in high-dimensional spaces\n- Slow on large datasets\n- Use for: text classification, high-dimensional data`,
      },
      {
        type: "section",
        title: "6. K-Means Clustering (Unsupervised)",
        body: `Groups data into k clusters by minimizing within-cluster distance.\nMust specify k upfront.\nSensitive to outliers and scale.\n\n**When to use:**\n- Customer segmentation\n- Discovering natural groupings\n- No labels available\n\n💡 Interview tip: Use the elbow method to choose k — plot inertia vs k, pick the bend.`,
      },
      {
        type: "section",
        title: "7. Algorithm Decision Framework",
        body: `Is it supervised or unsupervised?\n│\n├── Unsupervised → K-Means, PCA, DBSCAN\n│\n└── Supervised\n    │\n    ├── Start with: Linear/Logistic Regression (baseline)\n    │\n    ├── Need more accuracy?\n    │   ├── Tabular data → Random Forest → XGBoost\n    │   ├── Text/High-dim → SVM\n    │   └── Images → CNN\n    │\n    └── Need interpretability? → Linear models, Decision Tree`,
      },
      {
        type: "cheatsheet",
        title: "Day 5 Cheat Sheet",
        items: [
          { label: "Linear Reg", value: "Predict continuous value, interpretable baseline" },
          { label: "Logistic Reg", value: "Binary classification, probability output" },
          { label: "Decision Tree", value: "Interpretable, overfits alone" },
          { label: "Random Forest", value: "Safe default for tabular data, bagging" },
          { label: "XGBoost", value: "High accuracy, boosting, needs tuning" },
          { label: "KNN", value: "Similarity-based, scale first, slow prediction" },
          { label: "SVM", value: "High-dim data, text classification" },
          { label: "K-Means", value: "Clustering, unsupervised, pick k with elbow" },
          { label: "Scale needed", value: "KNN, SVM, Logistic Regression" },
          { label: "No scaling", value: "Random Forest, XGBoost, Decision Tree" },
        ],
      },
      {
        type: "questions",
        title: "Practice Questions",
        items: [
          {
            q: "When would you use Random Forest over XGBoost?",
            a: "Random Forest when you need a strong baseline quickly with minimal tuning and lower risk of overfitting. XGBoost when you need maximum accuracy and have time to tune. In production with tight deadlines, Random Forest is safer.",
          },
          {
            q: "How do you choose the number of clusters in K-Means?",
            a: "Use the elbow method — plot inertia (within-cluster sum of squares) vs k. The elbow where the curve bends is the optimal k. Can also use silhouette score for a more rigorous approach.",
          },
          {
            q: "Why is logistic regression called 'regression' if it's used for classification?",
            a: "It outputs a probability (a continuous value between 0 and 1) using the sigmoid function — that's the regression part. You then apply a threshold (usually 0.5) to convert the probability into a class label.",
          },
          {
            q: "What are the pros and cons of KNN?",
            a: "Pros: simple, no training phase, handles multi-class naturally. Cons: slow at prediction time, sensitive to scale (must normalize), struggles with high-dimensional data (curse of dimensionality).",
          },
          {
            q: "A client asks you to build a model to predict customer churn. Walk me through your approach.",
            a: "1. Define churn (30 days inactive?). 2. Explore data — check class imbalance. 3. Feature engineering (recency, frequency, tenure). 4. Baseline with logistic regression. 5. Try Random Forest / XGBoost. 6. Evaluate with precision/recall. 7. Present with business impact (revenue saved per prevented churn).",
          },
        ],
      },
    ],
  },
  {
    day: "Day 6",
    title: "Case Study & Take-Home Patterns",
    topics: ["What Interviewers Test", "Case Framework", "Clarifying Questions", "A/B Testing", "Metric Drops", "Take-Home Projects", "Communicating Results"],
    content: [
      {
        type: "section",
        title: "1. What Interviewers Are Actually Testing",
        body: `It's not about getting the right answer. It's about:\n\n**Structured thinking** — do you have a framework?\n**Business sense** — do you connect data to decisions?\n**Communication** — can you explain your reasoning clearly?\n**Handling ambiguity** — do you ask the right clarifying questions?\n\n💡 Interview tip: Thinking out loud > silent perfect answer. They want to see your process.`,
      },
      {
        type: "section",
        title: "2. The Case Study Framework",
        body: `Use this every time:\n\n1. Clarify    → ask questions before diving in\n2. Structure  → lay out your approach first\n3. Analyze    → work through the problem\n4. Recommend  → give a clear conclusion\n5. Caveat     → state assumptions and limitations\n\n💡 Asking good clarifying questions is a green flag. It shows you think before you code.`,
      },
      {
        type: "section",
        title: "3. A/B Testing Case (Most Common)",
        body: `**Scenario:** "Our product team wants to test a new checkout flow. How would you design and analyze this?"\n\n1. Define metric   → what are we optimizing? (conversion rate, revenue)\n2. Define success  → minimum detectable effect, significance level (p<0.05)\n3. Sample size     → use power analysis\n4. Run experiment  → random assignment, control vs treatment\n5. Analyze         → t-test or chi-square, check p-value\n6. Decide          → reject or fail to reject null\n7. Caveat          → novelty effect, segment differences, practical significance\n\n💡 Interview tip: Always mention practical vs statistical significance. A 0.1% lift might be significant but not worth shipping.`,
      },
      {
        type: "section",
        title: "4. Metric Degradation Case (Very Common)",
        body: `**Scenario:** "DAU dropped 15% last Tuesday. Walk me through how you'd investigate."\n\n1. Confirm the drop  → is the data correct? check logging/pipeline\n2. Narrow the scope  → when exactly? which platform? which region?\n3. Check external    → holiday, outage, marketing campaign change?\n4. Segment the data  → new vs returning users, device, geography\n5. Root cause        → funnel analysis, error rates, feature flags\n6. Recommend         → fix, monitor, or escalate\n\n💡 Interview tip: Always check "is the data real?" first. Metric drops are often data pipeline issues.`,
      },
      {
        type: "section",
        title: "5. Take-Home Project Patterns",
        body: `Most take-homes follow this structure:\n\n1. Load & inspect   → shape, types, nulls\n2. EDA              → distributions, correlations, outliers\n3. Feature eng.     → create meaningful features\n4. Model            → start simple, iterate\n5. Evaluate         → right metric for the problem\n6. Communicate      → clear writeup, visualizations\n\n**What separates good submissions:**\n- Clear problem framing at the top\n- EDA that tells a story (not just plots)\n- Model choice justified\n- Results tied to business impact\n- Limitations acknowledged\n\n💡 A clean, well-explained simple model beats a complex model with no explanation.`,
      },
      {
        type: "section",
        title: "6. Communicating Results to Non-Technical Stakeholders",
        body: `BAD:  "The model achieved 87% AUC-ROC on the test set."\n\nGOOD: "The model correctly identifies 8 out of 10 customers likely to churn — giving the team time to intervene before they cancel."\n\n💡 Always translate metrics into business language.`,
      },
      {
        type: "cheatsheet",
        title: "Day 6 Cheat Sheet",
        items: [
          { label: "Framework", value: "Clarify → Structure → Analyze → Recommend → Caveat" },
          { label: "Clarify", value: "Business goal, success metric, data available" },
          { label: "A/B Test", value: "Define metric → sample size → run → analyze → decide" },
          { label: "Stat sig", value: "p < 0.05 — unlikely due to chance" },
          { label: "Practical sig", value: "Effect is large enough to matter for business" },
          { label: "Metric drop", value: "Confirm data → narrow scope → external → segment → root cause" },
          { label: "Take-home", value: "EDA story → justify model → business impact → limitations" },
          { label: "Results", value: "Always translate metrics to business language" },
        ],
      },
      {
        type: "questions",
        title: "Practice Questions",
        items: [
          {
            q: "How would you design an A/B test for a new feature?",
            a: "Define the primary metric and minimum detectable effect. Calculate required sample size using power analysis. Randomly assign users to control and treatment. Run for at least one full business cycle. Check for novelty effects and segment differences before concluding.",
          },
          {
            q: "DAU dropped 20% overnight. What do you do?",
            a: "First verify the data — check if it's a logging or pipeline issue. Then narrow: when did it start, which platform, which region? Check external events (holiday, outage). Segment new vs returning users. Run funnel analysis to find where drop-off increased. Escalate with findings.",
          },
          {
            q: "What's the difference between statistical and practical significance?",
            a: "Statistical significance means the result is unlikely due to chance (p < 0.05). Practical significance means the effect is large enough to matter for the business. A tiny improvement can be statistically significant with a large enough sample but not worth the engineering cost to ship.",
          },
          {
            q: "How do you structure a take-home project presentation?",
            a: "1. Problem framing. 2. Data overview and key EDA findings. 3. Modeling approach and why you chose it. 4. Results tied to business impact. 5. Limitations and next steps. Keep it concise — one section per step.",
          },
          {
            q: "How would you measure the success of a recommendation system?",
            a: "Offline: precision@k, recall@k, NDCG. Online: click-through rate, conversion rate, revenue per session. Business: long-term retention, repeat purchase rate. Always prioritize online metrics — offline metrics don't always correlate with business impact.",
          },
        ],
      },
    ],
  },
  {
    day: "Day 7",
    title: "Behavioral + Telling Your Story",
    topics: ["Why Behavioral Matters", "STAR Framework", "6 Must-Prepare Questions", "Your Story", "Talking About Projects", "Questions to Ask", "Night Before Checklist"],
    content: [
      {
        type: "section",
        title: "1. Why Behavioral Questions Matter More Than You Think",
        body: `Most candidates over-prepare technical skills and under-prepare behavioral answers. Hiring decisions are often made on:\n\n**Culture fit** — will this person work well with the team?\n**Self-awareness** — do they know their strengths and weaknesses?\n**Communication** — can they explain their work clearly?\n**Motivation** — why do they actually want this role?\n\n💡 Interview tip: A technically strong candidate who can't communicate will lose to a slightly weaker candidate who tells a compelling story.`,
      },
      {
        type: "section",
        title: "2. The STAR Framework",
        body: `Use this for every behavioral question:\n\n**S — Situation** → set the context (brief)\n**T — Task**      → what was your responsibility?\n**A — Action**    → what did YOU specifically do?\n**R — Result**    → what was the outcome? (quantify if possible)\n\nExample:\nS: "At LG Uplus, we needed to predict World Cup outcomes for a fan app launching in 3 months."\nT: "I was responsible for building and validating the prediction model."\nA: "I tested multiple algorithms and built a validation framework using historical match data."\nR: "The model achieved 60% accuracy and the app hit 1.15M visits and 500K users in 3 months."`,
      },
      {
        type: "section",
        title: "3. The 6 Questions You Must Prepare",
        body: `**1. "Tell me about yourself."**\nNot your life story. A 90-second pitch: background → what you do → why this role.\n\n**2. "Why data science / why this role?"**\nBe specific. Connect your past experience to where you want to go.\n\n**3. "Tell me about a project you're proud of."**\nUse STAR. Pick one with measurable results.\n\n**4. "Tell me about a time you failed."**\nShow self-awareness. Focus on what you learned. Don't blame others.\n\n**5. "Tell me about a difficult stakeholder."**\nShow empathy and communication skills. Focus on resolution.\n\n**6. "Where do you want to be in 3-5 years?"**\nShow ambition but stay realistic. Align with the company's direction.`,
      },
      {
        type: "section",
        title: "4. Telling Your Story (Non-Traditional Background)",
        body: `BAD:  "I'm still transitioning into data science."\n\nGOOD: "I've spent the last several years building a strong foundation — math at UW, analytics at Georgia Tech, and hands-on ML work at LG Uplus and Coupang. I'm now focused on going deeper into ML engineering."\n\n**Your story arc:**\n1. Strong math foundation (UW)\n2. Applied it to analytics (Georgia Tech + industry)\n3. Built real ML systems (LG Uplus, Coupang)\n4. Now deepening expertise in data science\n\n💡 Own your journey. Every step was intentional. Non-linear paths show adaptability.`,
      },
      {
        type: "section",
        title: "5. Your Strongest Projects to Reference",
        body: `**World Cup prediction model (LG Uplus)**\n→ 1.15M visits, 500K users in 3 months\n\n**Image classification (Asurion)**\n→ Improved accuracy from 60% to 95% using EfficientNetB7\n\n**Anomaly detection (Coupang)**\n→ Monitoring KPIs across fulfillment centers\n\n**Climate/GIS analysis (YTN)**\n→ Won 2024 Data Journalism Innovation Award\n\nFor each project prepare:\n- What problem were you solving?\n- What was your specific contribution?\n- What was the result? (numbers)\n- What would you do differently?`,
      },
      {
        type: "section",
        title: "6. Questions to Ask the Interviewer",
        body: `Always have 3 questions ready:\n\n- "What does success look like in the first 90 days?"\n- "What's the biggest technical challenge the team is facing right now?"\n- "How does the data science team collaborate with product and engineering?"\n- "What does the growth path look like for this role?"\n\n💡 Asking thoughtful questions signals genuine interest and seniority.`,
      },
      {
        type: "section",
        title: "7. The Night Before Checklist",
        body: `□ Review your STAR stories (at least 3 ready)\n□ Re-read the job description — match your language to theirs\n□ Know your resume cold — every line is fair game\n□ Prepare your 3 questions for the interviewer\n□ Review Day 1-6 cheat sheets (30 min max)\n□ Sleep. Seriously.`,
      },
      {
        type: "cheatsheet",
        title: "Day 7 Cheat Sheet",
        items: [
          { label: "STAR", value: "Situation → Task → Action → Result" },
          { label: "Tell me about you", value: "90-sec pitch: background → now → why here" },
          { label: "Why DS?", value: "Specific, connect past experience to future" },
          { label: "Project", value: "STAR + numbers + what you'd do differently" },
          { label: "Failure", value: "Self-aware, what you learned, no blame" },
          { label: "Your arc", value: "Math (UW) → Analytics (GT) → ML systems → deeper DS" },
          { label: "Key projects", value: "World Cup (1.15M visits), Image (60→95%), Anomaly, Award" },
          { label: "Ask them", value: "90-day success, team challenges, growth path" },
          { label: "Night before", value: "STAR stories, job desc, cheat sheets, sleep" },
        ],
      },
      {
        type: "questions",
        title: "Practice Questions",
        items: [
          {
            q: "Tell me about yourself.",
            a: "I have a background in mathematics from UW and a Master's in Analytics from Georgia Tech. I've built ML systems in industry — predictive models at LG Uplus, data science at YTN where I won a national data journalism award, and anomaly detection at Coupang. I'm now focused on going deeper into machine learning — which is exactly what drew me to this role.",
          },
          {
            q: "Tell me about a project you're proud of.",
            a: "At LG Uplus I built a model to predict World Cup match outcomes for a fan app. I owned the full ML pipeline — data collection, feature engineering, model selection, validation. The ensemble model achieved 60% accuracy and the app hit 1.15M visits and 500K users within 3 months.",
          },
          {
            q: "Why do you want to move from analyst to data scientist?",
            a: "As an analyst I've gotten strong at finding insights in data. But I keep hitting the ceiling of what I can do without building predictive systems. I want to go from describing what happened to building models that predict what will happen — and I've been developing those skills through my ML work at LG Uplus and Coupang.",
          },
          {
            q: "Tell me about a time you failed.",
            a: "Pick something real, show what you learned, keep it professional. Don't pick something that questions your core competency. Show genuine reflection and what you'd do differently.",
          },
          {
            q: "Where do you see yourself in 3-5 years?",
            a: "I want to be a strong ML engineer who can own the full lifecycle of a data product — from problem definition to deployment. Longer term I'm interested in building systems that have real impact at scale. I see this role as the right environment to get there.",
          },
        ],
      },
    ],
  },
];

type ContentBlock = {
  type: string;
  title?: string;
  body?: string;
  items?: { label?: string; value?: string; q?: string; a?: string }[];
};

function formatBody(text: string) {
  return text.split("\n").map((line, i) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return <p key={i} className="mb-2 text-[#aaa] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: bold }} />;
  });
}

export default function CoursePage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("ds_sprint_auth");
    if (saved === "true") setAuthenticated(true);
  }, []);

  function handleLogin() {
    if (input === COURSE_PASSWORD) {
      localStorage.setItem("ds_sprint_auth", "true");
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (!authenticated) {
    return (
      <main className="bg-[#0a0a0a] min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="text-lg font-bold text-white">DS Sprint</span>
            <p className="text-[#555] text-sm mt-2">Enter your access password</p>
          </div>
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-8">
            <input
              type="password"
              placeholder="Password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#f5a623] transition mb-4 placeholder-[#444]"
            />
            {error && <p className="text-red-500 text-xs mb-4">Incorrect password. Check your email.</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-[#f5a623] text-black font-bold py-3 rounded-lg hover:bg-[#e6951a] transition"
            >
              Access Course
            </button>
          </div>
          <p className="text-center text-[#444] text-xs mt-6">
            Purchased but no password? Email danbwkim@gmail.com
          </p>
        </div>
      </main>
    );
  }

  const currentDay = days[activeDay];

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white">

      {/* TOP NAV */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-[#1a1a1a]">
        <span className="text-lg font-bold">DS Sprint</span>
        <span className="text-[#555] text-sm">7-Day Interview Course</span>
      </nav>

      <div className="flex max-w-6xl mx-auto">

        {/* SIDEBAR */}
        <aside className="w-64 shrink-0 border-r border-[#1a1a1a] min-h-screen px-4 py-8">
          <p className="text-[#444] text-xs uppercase tracking-widest mb-4 px-2">Your Plan</p>
          <div className="space-y-1">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className={`w-full text-left px-3 py-3 rounded-lg transition ${
                  activeDay === i
                    ? "bg-[#1a1a1a] text-white border border-[#f5a623]/30"
                    : "text-[#555] hover:text-[#888] hover:bg-[#111]"
                }`}
              >
                <div className="text-xs text-[#f5a623] font-semibold mb-0.5">{d.day}</div>
                <div className="text-xs leading-tight">{d.title}</div>
                {d.content.length === 0 && (
                  <div className="text-[10px] text-[#333] mt-1">Coming soon</div>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 px-10 py-10 max-w-3xl">

          <div className="text-[#f5a623] text-xs font-semibold uppercase tracking-widest mb-2">
            {currentDay.day}
          </div>
          <h1 className="text-3xl font-extrabold mb-8">{currentDay.title}</h1>

          {currentDay.content.length === 0 ? (
            <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-8 text-center">
              <p className="text-[#555] text-sm">Content coming soon.</p>
              <p className="text-[#333] text-xs mt-2">Check back tomorrow.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {(currentDay.content as ContentBlock[]).map((block, i) => {
                if (block.type === "section") {
                  return (
                    <div key={i} className="bg-[#111] border border-[#1f1f1f] rounded-xl p-6">
                      <h2 className="text-white font-bold text-base mb-4">{block.title}</h2>
                      {formatBody(block.body || "")}
                    </div>
                  );
                }

                if (block.type === "cheatsheet") {
                  return (
                    <div key={i} className="bg-[#0f1a0f] border border-[#1a2e1a] rounded-xl p-6">
                      <h2 className="text-white font-bold text-base mb-4">📄 {block.title}</h2>
                      <div className="space-y-2">
                        {block.items?.map((item, j) => (
                          <div key={j} className="flex gap-4 text-sm">
                            <span className="text-[#f5a623] font-semibold w-24 shrink-0">{item.label}</span>
                            <span className="text-[#888]">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (block.type === "questions") {
                  return (
                    <div key={i} className="space-y-4">
                      <h2 className="text-white font-bold text-base">✅ {block.title}</h2>
                      {block.items?.map((item, j) => (
                        <div key={j} className="bg-[#111] border border-[#1f1f1f] rounded-xl p-5">
                          <p className="text-white text-sm font-medium mb-3">Q: {item.q}</p>
                          <p className="text-[#666] text-sm leading-relaxed">→ {item.a}</p>
                        </div>
                      ))}
                    </div>
                  );
                }

                return null;
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
