export default function Home() {
  function onGoToSection(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href")?.substring(1);
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }

  return (
    <>
      <main className="min-h-screen flex items-center banner">
        <section className="relative py-5 max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="col-span-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 animate-fade-in">
                Hi, I'm Eko
              </h1>
              <h2 className="text-xl sm:text-2xl text-slate-300 mb-6 animate-fade-in animation-delay-100">
                Full Stack Developer
              </h2>
              <p className="text-slate-200 leading-relaxed mb-10 animate-fade-in animation-delay-200">
                Welcome to my landing page! I’m Eko, a passionate full-stack
                developer experienced in React, React Native, Node.js, and more.
                I enjoy building web and mobile applications that are not only
                functional but also deliver great user experiences. Feel free to
                explore my projects and get in touch!
              </p>
              <div className="flex gap-4 animate-fade-in animation-delay-100">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-lg bg-red-500 px-6 py-3 text-sm font-medium text-white hover:bg-red-600 transition"
                  onClick={onGoToSection}
                >
                  My Works
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800 transition"
                  onClick={onGoToSection}
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Portfolio Section */}
      <section id="projects" className="bg-slate-900 text-slate-100 py-24 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <h3 className="text-3xl font-bold mb-3">Selected Works</h3>
            <p className="text-slate-400 max-w-2xl">
              A small selection of projects I've worked on, focusing on web and
              mobile applications.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 hover:border-slate-700 transition relative pb-14">
              <h4 className="text-xl font-semibold mb-2">Copek</h4>
              <p className="text-slate-400 text-sm mb-4">
                A motorcycle taxi booking app includes food delivery features.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-xs px-2 py-1 rounded bg-slate-800">
                  TypeScript
                </span>
                <span className="text-xs px-2 py-1 rounded bg-slate-800">
                  React Native
                </span>
                <span className="text-xs px-2 py-1 rounded bg-slate-800">
                  Node.js
                </span>
                <span className="text-xs px-2 py-1 rounded bg-slate-800">
                  MongoDB
                </span>
                <span className="text-xs px-2 py-1 rounded bg-slate-800">
                  Socket.io
                </span>
                <span className="text-xs px-2 py-1 rounded bg-slate-800">
                  PHP
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 py-4 px-6">
                <a
                  href="#"
                  className="text-sm font-medium text-red-400 hover:text-red-300"
                >
                  View Project →
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 hover:border-slate-700 transition relative pb-14">
              <h4 className="text-xl font-semibold mb-2">Monflo</h4>
              <p className="text-slate-400 text-sm mb-4">
                Simple app for managing personal finances and budgeting.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-xs px-2 py-1 rounded bg-slate-800">
                  Typescript
                </span>
                <span className="text-xs px-2 py-1 rounded bg-slate-800">
                  React Native
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 py-4 px-6">
                <a
                  href="#"
                  className="text-sm font-medium text-red-400 hover:text-red-300"
                >
                  View Project →
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 hover:border-slate-700 transition relative pb-14">
              <h4 className="text-xl font-semibold mb-2">Eksamart</h4>
              <p className="text-slate-400 text-sm mb-4">
                Simple e-commerce app for record transactions and product
                management.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-xs px-2 py-1 rounded bg-slate-800">
                  Typescript
                </span>
                <span className="text-xs px-2 py-1 rounded bg-slate-800">
                  React Native
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 py-4 px-6">
                <a
                  href="#"
                  className="text-sm font-medium text-red-400 hover:text-red-300"
                >
                  View Project →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-slate-900 text-slate-100 py-24">
        <div className="max-w-3xl w-full mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">Let’s Work Together</h3>
          <p className="text-slate-400 mb-10">
            Have a project, idea, or opportunity in mind? Feel free to reach out
            — I’m always open to meaningful conversations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:ekomardiatno@gmail.com"
              className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800 transition"
            >
              Email Me
            </a>

            <a
              href="https://www.linkedin.com/in/ekomardiatno"
              target="_blank"
              className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800 transition"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/ekomardiatno"
              target="_blank"
              className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800 transition"
            >
              GitHub
            </a>
          </div>

          <p className="mt-10 text-sm text-slate-500">
            © 2026 Eko. Built with care.
          </p>
        </div>
      </section>
    </>
  );
}
