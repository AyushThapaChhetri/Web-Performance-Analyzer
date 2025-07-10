# React + TypeScript + Vite

Web Performance Analyzer

Overview

This is a simple React web application that analyzes the performance of any given URL using the Google PageSpeed Insights API. It displays three key metrics:

Load Time: Total page load duration in seconds.
Page Size: Aggregate size of all resources (HTML, CSS, JS, images) in megabytes (MB).
Number of Requests: Total HTTP requests made to load the page.

The application is built entirely on the frontend, making direct requests to the PageSpeed Insights API (https://www.googleapis.com/pagespeedonline/v5/runPagespeed) using an API key, with no backend server involved. The implementation was guided by the Google PageSpeed Insights API documentation.

Features

User-friendly interface to input a URL and trigger performance analysis.
Displays performance metrics with color-coded progress bars (green for good, orange for moderate, red for poor).
Responsive design that adapts to various screen sizes.
Error handling with toast notifications for invalid URLs or API failures.

Technologies Used

React: For building a dynamic user interface using functional components and hooks.
Chakra UI: For styling and responsive design with a component-based approach.
Vite: For a fast and modern development environment and build tool.
Axios: For making HTTP requests to the PageSpeed Insights API with a simple, promise-based syntax.
React Hook Form & Yup: For efficient form handling and URL validation with minimal boilerplate.
React Toastify: For user-friendly error notifications.

Setup Instructions

Follow these steps to set up and run the application locally:

1.Prerequisites: Ensure you npm (or yarn) installed on your system to run the React development environment.
Clone the Repository:git clone https://github.com/yourusername/your-repo-name.git

2.Navigate to the Project Directory:cd your-repo-name

3.Install Dependencies:npm install

4.Set Up Environment Variables:
Create a .env file in the root directory.
Add your Google PageSpeed Insights API key:VITE_GOOGLE_API_KEY=your_api_key_here

To obtain an API key:
i.Go to the Google Cloud Console.
ii.Create a new project or select an existing one.
iii.Enable the PageSpeed Insights API.
iv.Generate an API key under Credentials.

5.Run in Terminal: chakra:typegen (For integrating customized theme with default theme value!)

6.Run the Development Server:npm run dev

7.Open Your Browser: Visit http://localhost:5173 (or the port specified in your terminal).

Usage
1.Enter a valid URL in the input field (e.g., https://example.com).
2.Click the "Analyze Performance" button.
3.Wait for the analysis to complete. The results will display:
-Load Time (in seconds).
-Page Size (in MB).
-Number of Requests.
-Progress bars indicate performance: 🟩 Good (≤ 40%), 🟧 Moderate (≤ 70%), 🟥 Poor (> 70%).

AI Tools Used
This project was developed with the assistance of AI tools, including:
ChatGPT: Provided code suggestions and debugging support.
Claude: Assisted with structuring React components and optimizing code.

How They Helped
-Suggested efficient ways to make direct API calls to https://www.googleapis.com/pagespeedonline/v5/runPagespeed.
-Helped parse the API response to extract key metrics (load time, page size, and number of requests).

Deployment
-The application is deployed on Vercel and accessible at your-live-url-here.
-To deploy your own version:
-Push your repository to GitHub.
-Connect it to Vercel via the dashboard.
-Set the VITE_GOOGLE_API_KEY environment variable in Vercel’s settings.
