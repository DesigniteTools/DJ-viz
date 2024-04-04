# Smells Viz

## Description

The project aims to develop a web application for visualizing and analyzing code smells detected by the [DesigniteJava](https://www.designite-tools.com/docs/designitejava.html#) software. DesigniteJava identifies various types of code smells within Java projects and generates CSV files containing detailed information about these smells. The web application provides a user-friendly interface to upload the folder path containing these CSV files and dynamically visualize the data extracted from them.

## Features

### Smells Visualization (TYPE="smells")

1. **CSV Data Visualization:**

   - Allows users to upload the folder path containing CSV files generated by DesigniteJava.
   - Reads the CSV files and visualizes the data to provide insights into different categories of code smells.

2. **Bar Graph Representation:**

   - Displays a bar graph showing the total number of smells in each smell category.

3. **Pie Chart Analysis:**

   - Provides pie charts for each smell category, illustrating the distribution and types of smells within them.

4. **Metric Selection and Scatter Plot:**

   - Offers a selection of metrics through radio buttons.
   - Based on the selected metric, displays a scatter plot representing the relationship between different metrics for deeper analysis.

5. **Treemap Visualization:**

   - Presents a treemap visualization where the size of rectangles corresponds to the lines of code (LOC) of different code entities.
   - Includes a slider to set the range of metrics to be displayed on the treemap, allowing users to focus on specific metric values.

### Trend Analysis (TYPE="trend")

1. **Trend Analysis for Smells:**

   - The trend shows how many smells have been introduced, remained, and removed from one version to another.

2. **Trend Aanalysis for Metrics:**

   - The trend shows the Min, Max and Avg values of selected metrics from one version to another.

It is useful when the development wants to observe the quality of code after refactoring cycle.

## Usage

Follow these steps to run the application using Docker:

### Prerequisites

1. **Run DesigniteJava for Analysis Files:** Before proceeding, ensure that you have run DesigniteJava to analyze your Java projects and generate the required files. Store these files in your local device.

2. **Check Docker Installation:** Docker should be installed on your machine. You can check if Docker is installed by running the following command in your terminal:

   ```bash
   docker --version
   ```

3. **Install Docker Desktop:** If Docker is not installed, download and install Docker Desktop for your operating system:

   - For Mac: [Docker Desktop for Mac](https://docs.docker.com/desktop/mac/install/)
   - For Windows: [Docker Desktop for Windows](https://docs.docker.com/desktop/windows/install/)
   - For Linux: [Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)

4. Ensure that you have the necessary folders and files organized according to the type of analysis you intend to perform (e.g., smells or trend). For smells analysis, the folder should contain the files generated by DesigniteJava. For trend analysis, the folder should have subfolders named after commit hashes, containing a text file with commit names in the desired order for trend analysis.

## Installation

1. Clone the repository: `git clone https://github.com/SMART-Dal/smells-viz.git`
2. Navigate to the project directory: `cd smells-viz/smellsViz`

### Running the Application with Docker

1. Open your terminal and navigate to the folder where the docker-compose.yml file is located.

2. Run the following command in your terminal, replacing `/absolute_path/of/smells/folder` with the absolute path to your smells folder and selecting the appropriate `TYPE` from either "smells" or "trend":

   ```bash
   FOLDER="/absolute_path/of/smells/folder" TYPE="smells" docker-compose up
   ```

   For the "smells" type, ensure that the folder contains the files generated by DesigniteJava.

   ```bash
   FOLDER="/absolute_path/of/trend/folder" TYPE="trend" docker-compose up
   ```

   For the "trend" type, ensure that the folder contains subfolders that are named after the commit hashes that need to be analyzed. The folder should also contain a .txt file that has the name of the subfolders in each line in the order it needs to be analyzed.

3. Once the containers are up and running, open your web browser and go to [localhost:3000](http://localhost:3000) to access the application.
