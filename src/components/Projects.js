import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import ExternalLinks from "./ExternalLinks";
import ShiningButton from "./Badge";

class Projects extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false, // To control "Load More" functionality
      activeKey: "1"
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }

  toggleExpand() {
    this.setState((prevState) => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    const projects = {
      "Email Security Project - Broadcom Inc": {
        desc: "Migrated applications from Ansible to Kubernetes on GKE using Helm and CI/CD pipelines in GitLab and Jenkins, automating GCP infrastructure with Terraform.",
        techStack: "GCP, GKE, Terraform, Helm, Jenkins, GitLab, Bitbucket, Ansible, Python, Shell scripting",
        link: "https://github.com/Chinna/email-security-project",
        open: "https://broadcom.com/email-security"
      },
      "ONDC": {
        desc: "Implemented GKE-based solutions with Terraform for efficient management of cloud resources, integrating Helm charts for app deployments.",
        techStack: "GKE, Terraform, Helm, Kubernetes",
        link: "https://github.com/Chinna/ondc",
        open: "https://ondc-project.com"
      },
      "GKE Clusters": {
        desc: "Managed 40+ GKE clusters for multi-tenant environments, automated GKE upgrades, and developed security policies for robust cloud management.",
        techStack: "GKE, Kubernetes, Terraform, Helm, Docker, GCP",
        link: "https://github.com/Chinna/sabre",
        open: "https://sabre-project.com"
      },
      "CI/CD Automation for Infrastructure": {
        desc: "Created automated CI/CD pipelines using Terraform and Jenkins for seamless deployment of infrastructure across multiple environments.",
        techStack: "Terraform, Jenkins, GKE, Docker, Kubernetes",
        link: "https://github.com/Chinna/cicd-infrastructure",
        open: "https://cicd-project.com"
      },
      "Kubernetes Infrastructure Automation": {
        desc: "Automated Kubernetes cluster provisioning and app deployment using Helm and Terraform, enhancing workflow efficiency in cloud environments.",
        techStack: "Kubernetes, Terraform, Helm, GKE",
        link: "https://github.com/Chinna/kubernetes-automation",
        open: "https://k8s-infrastructure.com"
      },
      "Dockerized Microservices": {
        desc: "Developed a set of Dockerized microservices, each with Kubernetes orchestration and Helm charts for smooth deployment on GKE.",
        techStack: "Docker, Kubernetes, Helm, GKE",
        link: "https://github.com/Chinna/docker-microservices",
        open: "https://docker-microservices.com"
      },
      "Google Cloud Platform": {
        desc: "Expert in GCP services like compute engine, GKE, CloudSQL, Anthos service mesh, Cloud service mesh,etc..",
        techStack: "Docker, Kubernetes, Helm, GKE",
        link: "https://github.com/Chinna/docker-microservices",
        open: "https://docker-microservices.com"
      }
    };

    // Conditionally show only the first few projects or all of them
    const visibleProjects = this.state.expanded
      ? Object.keys(projects)
      : Object.keys(projects).slice(0, 6); // Show the first 6 projects initially

    return (
      <div id="projects">
        <FadeInSection>
        <div className="shining-button-container">
          <ShiningButton>PROJECTS</ShiningButton>
        </div>
        </FadeInSection>
        <div className="section-header">
          <span className="section-title">Projects I've Built 👩‍💻</span>
        </div>
        <div className="project-container">
          <ul className="projects-grid">
            {visibleProjects.map((key, i) => (
              <FadeInSection delay={`${i + 1}00ms`} key={i}>
                <li className="projects-card">
                  <div className="card-header">
                    <div className="folder-icon">
                      <FolderOpenRoundedIcon style={{ fontSize: 35 }} />
                    </div>
                    <ExternalLinks
                      githubLink={projects[key].link}
                      openLink={projects[key].open}
                      showSpinner={projects[key].spinner}
                    />
                  </div>
                  <div className="card-title">{key}</div>
                  <div className="card-desc">{projects[key].desc}</div>
                  <div className="card-tech">{projects[key].techStack}</div>
                </li>
              </FadeInSection>
            ))}
          </ul>
          {/* Load More Button */}
          <div className="shining-button-container">
            <button className="show-more" onClick={this.toggleExpand}>
              {this.state.expanded ? "Show Less ↑" : "Load More ↓"}
            </button>

          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
