# DJ-Viz: Visualization for DesigniteJava analysis

The project aims to develop a web application for visualizing code smells and code quality metrics detected by the [DesigniteJava](https://designite-tools.com/products-dj) tool. DesigniteJava identifies various types of code smells in Java projects and generates CSV files containing detailed information about the detected smells. The web application provides a user-friendly interface to visualize the detected smells and computed code quality metrics.

## Features

- Supports visualizing detected code smells and computed code quality metrics by DesigniteJava.
- Supports two modes: _smells_ for visualizing DesigniteJava's analysis of a commit (typically the latest commit), _trend_ for visualizing DesigniteJava's analysis of a set of commits of a Java repository.

<img width="1002" alt="Overview" src="./docs/smells-overview.png">
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

4. Ensure that you have the necessary folders and files organized according to the type of analysis you intend to perform (e.g., smells or trend).

   - For smells analysis, the folder should contain the files generated by DesigniteJava.

   <img width="1002" alt="Screenshot 2024-04-05 at 11 10 04" src="https://github.com/SMART-Dal/smells-viz/assets/74357926/0d2970a7-9d7b-4350-88ec-f8d6d600e280">

   - For the "trend" type, ensure that the folder contains subfolders that are named after the commit hashes that need to be analyzed.

   <img width="1002" alt="Screenshot 2024-04-05 at 11 10 33" src="https://github.com/SMART-Dal/smells-viz/assets/74357926/58ef70d6-c733-4fbe-8760-192b4089253b">

   - The folder should also contain a .txt file that has the name of the subfolders in each line in the order it needs to be analyzed. The name of the file must be `commits.txt` and it should be in the same main folder.

   <img width="1031" alt="Screenshot 2024-04-12 at 12 40 38" src="https://github.com/SMART-Dal/smells-viz/assets/74357926/9649ca13-dcb7-4a45-a6e3-f1326da1988e">

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

   For the "trend" type, ensure that the folder contains subfolders that are named after the commit hashes that need to be analyzed.

3. Once the containers are up and running, open your web browser and go to [localhost:3000](http://localhost:3000) to access the application.
