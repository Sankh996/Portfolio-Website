/**
 * Sankhadeep Ganguly Portfolio - Developer Terminal & Command Palette
 * Triggerable via Ctrl+K, Cmd+K, or Terminal Icon
 */

(function () {
  const terminalModal = document.getElementById('terminal-modal');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const openTerminalBtns = document.querySelectorAll('.open-terminal-btn');
  const closeTerminalBtn = document.getElementById('terminal-close-btn');

  if (!terminalModal || !terminalInput || !terminalOutput) return;

  const COMMANDS = {
    help: `Available commands:
  <span style="color:#58a6ff">about</span>          - Learn more about Sankhadeep
  <span style="color:#58a6ff">projects</span>       - View featured projects & startups
  <span style="color:#58a6ff">skills</span>         - View technical skills & proficiencies
  <span style="color:#58a6ff">experience</span>     - View startup & hackathon achievements
  <span style="color:#58a6ff">certifications</span> - View official cloud & AI certifications
  <span style="color:#58a6ff">education</span>      - View academic background
  <span style="color:#58a6ff">contact</span>        - Get email, phone, and social links
  <span style="color:#58a6ff">resume</span>         - Open interactive resume viewer
  <span style="color:#58a6ff">goto &lt;sec&gt;</span>     - Navigate to section (e.g. goto projects)
  <span style="color:#58a6ff">theme</span>          - Toggle Dark / Light theme
  <span style="color:#58a6ff">clear</span>          - Clear terminal screen
  <span style="color:#58a6ff">exit</span>           - Close terminal prompt`,

    about: `<strong style="color:#38bdf8">Sankhadeep Ganguly</strong>
Computer Science & Engineering student at Chandigarh University (2025–2029).
Co-Founder of <span style="color:#818cf8">Near Hai</span> (Hyperlocal Discovery Platform).
Passionate about Artificial Intelligence, Machine Learning, Cloud Architecture (OCI & Azure Certified), and Embedded Systems.`,

    projects: `<strong style="color:#38bdf8">Featured Projects:</strong>
1. <strong>Near Hai</strong> - Hyperlocal Discovery Platform (Top Finalist @ Bharat Mandapam, 25k+ teams)
2. <strong>AgriAI</strong> - Soil Monitoring & Counterfeit Fertilizer Detector (Finalist @ IIT Delhi Square Hack)
3. <strong>IoT Smart Street Lighting</strong> - Automated energy saving system with Arduino & IR sensors
<em>Tip: Run 'goto projects' to view project cards.</em>`,

    skills: `<strong style="color:#38bdf8">Technical Skill Matrix:</strong>
• <strong>Languages:</strong> C/C++, Python, JavaScript, HTML5, CSS3
• <strong>AI/ML:</strong> Generative AI, Computer Vision, NLP, Deep Learning, Teachable Machine
• <strong>Cloud:</strong> Oracle Cloud Infrastructure (Certified), Microsoft Azure (AI-900)
• <strong>Core & Tools:</strong> DSA, OOP, VS Code, Arduino IDE, Git & GitHub`,

    experience: `<strong style="color:#38bdf8">Experience & Hackathons:</strong>
• <strong>Co-Founder @ Near Hai</strong> (Feb 2026 - Present)
  - Finalist in India Innovates Startup Hackathon (Bharat Mandapam, New Delhi)
• <strong>Finalist @ Square Hack 2025 (IIT Delhi)</strong> (Dec 2025)
  - Led team of 4 to build Soil Monitoring & Anti-Fake Fertilizer AI
• <strong>Tata Crucible Campus Quiz</strong> (Participant)`,

    certifications: `<strong style="color:#38bdf8">Official Certifications:</strong>
1. <strong>Microsoft Certified: Azure AI-900 Fundamentals</strong> (Feb 2026)
2. <strong>Oracle Certified: OCI 2025 Multicloud Architect Professional</strong> (Oct 2025)`,

    education: `<strong style="color:#38bdf8">Education:</strong>
• <strong>B.E. Computer Science & Engineering:</strong> Chandigarh University (2025 - 2029) | CGPA: 6.7/10.0
• <strong>Higher Secondary XII (PCMB):</strong> N.N.S. High School (84.6%)
• <strong>Madhyamik X:</strong> S.E.R. Boys' High School (90.0%)`,

    contact: `<strong style="color:#38bdf8">Contact Sankhadeep:</strong>
• Email: <a href="mailto:sankhadeepganguly4@gmail.com" style="color:#38bdf8">sankhadeepganguly4@gmail.com</a>
• Phone: <a href="tel:+918167274648" style="color:#38bdf8">+91 8167274648</a>
• LinkedIn: <a href="https://www.linkedin.com/in/sankhadeep-ganguly-8612a0269/" target="_blank" style="color:#818cf8">linkedin.com/in/sankhadeep-ganguly-8612a0269/</a>
• GitHub: <a href="https://github.com/Sankh996" target="_blank" style="color:#818cf8">github.com/Sankh996</a>`,

    sudo: `<span style="color:#f43f5e">Permission denied: Sankhadeep is already root of this terminal.</span>`
  };

  function openTerminal() {
    terminalModal.classList.add('active');
    terminalInput.focus();
  }

  function closeTerminal() {
    terminalModal.classList.remove('active');
  }

  openTerminalBtns.forEach(btn => btn.addEventListener('click', openTerminal));
  if (closeTerminalBtn) closeTerminalBtn.addEventListener('click', closeTerminal);

  terminalModal.addEventListener('click', (e) => {
    if (e.target === terminalModal) closeTerminal();
  });

  // Global Shortcut Ctrl+K / Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (terminalModal.classList.contains('active')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape' && terminalModal.classList.contains('active')) {
      closeTerminal();
    }
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawInput = terminalInput.value.trim();
      const input = rawInput.toLowerCase();
      terminalInput.value = '';

      if (!input) return;

      // Print command line
      appendOutput(`<div class="terminal-cmd-entry"><span style="color:#58a6ff">visitor@sankhadeep-portfolio:~$</span> <span>${escapeHtml(rawInput)}</span></div>`);

      if (input === 'clear') {
        terminalOutput.innerHTML = '';
        return;
      }

      if (input === 'exit') {
        closeTerminal();
        return;
      }

      if (input === 'theme') {
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) themeBtn.click();
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        appendOutput(`Theme switched to: <strong style="color:#38bdf8">${currentTheme}</strong>`);
        return;
      }

      if (input === 'resume') {
        const resumeModalBtn = document.getElementById('view-resume-btn');
        if (resumeModalBtn) resumeModalBtn.click();
        appendOutput(`Opening interactive resume viewer...`);
        closeTerminal();
        return;
      }

      if (input.startsWith('goto ')) {
        const sectionId = input.replace('goto ', '').trim();
        const target = document.getElementById(sectionId);
        if (target) {
          closeTerminal();
          target.scrollIntoView({ behavior: 'smooth' });
          appendOutput(`Navigating to <strong>#${sectionId}</strong>...`);
        } else {
          appendOutput(`<span style="color:#f43f5e">Section '#${sectionId}' not found. Try: goto about, projects, skills, contact, experience</span>`);
        }
        return;
      }

      if (COMMANDS[input]) {
        appendOutput(`<div class="terminal-response">${COMMANDS[input]}</div>`);
      } else {
        appendOutput(`<span style="color:#f43f5e">Command not found: '${escapeHtml(rawInput)}'. Type '<span style="color:#58a6ff">help</span>' for a list of commands.</span>`);
      }

      // Scroll to bottom
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });

  function appendOutput(html) {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML = html;
    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
})();
