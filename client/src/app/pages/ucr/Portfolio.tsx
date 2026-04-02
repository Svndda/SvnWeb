
export default function Portfolio() {
  return (
    <>
      {/* Navegación Local */}
      <nav className="navbar">
        <div className="container flex gap-md">
          <a className="nav-link" href="#about">Sobre mí</a>
          <a className="nav-link" href="#experience">Experiencia</a>
          <a className="nav-link" href="#skills">Tecnologías</a>
          <a className="nav-link" href="#education">Educación</a>
        </div>
      </nav>

      {/* Header / Hero */}
      <header className="text-center py-5" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '64px 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '16px' }}>
            Aaron Carmona Sánchez, C21705
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
            Desarrollador de software enfocado en aplicaciones de alto rendimiento, 
            arquitecturas escalables y desarrollo multiplataforma.
          </p>
        </div>
      </header>

      {/* Sobre Mí */}
      <section id="about" className="container">
        <h2 className="section-title">Sobre mí</h2>
        <div className="card">
          <p>
            Soy estudiante avanzado de Ciencias de la Computación en la
            Universidad de Costa Rica y desarrollador de software con experiencia
            en el diseño e implementación de aplicaciones escalables y de alto
            rendimiento.
          </p>
          <br />
          <p>
            Mi enfoque profesional se encuentra en transformar necesidades técnicas complejas en
            soluciones de software eficientes, priorizando siempre la calidad del código,
            la mantenibilidad y la experiencia del usuario final. Trabajo principalmente
            en el desarrollo de aplicaciones móviles Android, sistemas de escritorio
            en C++ y APIs RESTful.
          </p>
          <br />
          <p>
            Actualmente participo en un proyecto de investigación donde
            desarrollo una API RESTful y aplicaciones móviles con integración de sistemas de mapas,
            procesamiento de coordenadas geográficas, solicitudes de usuarios y gestión de datos
            con uso de arquitecturas basadas en MVVM.
          </p>
        </div>
      </section>

      {/* Experiencia */}
      <section id="experience" className="container">
        <h2 className="section-title">Experiencia</h2>
        
        <div className="flex-col gap-md">
          <div className="card">
            <h3>Instituto de Investigaciones en Ingeniería (INII) — Universidad de Costa Rica</h3>
            <p><strong>Desarrollador de Software</strong> | 2024 – Presente</p>
            <ul>
              <li>Desarrollo de una aplicación Android utilizando Kotlin con arquitectura híbrida MVC–MVVM en pro de mejorar la mantenibilidad y escalabilidad del código.</li>
              <li>Implementación de consumo de APIs RESTful utilizando Retrofit, OkHttp y Gson para una comunicación eficiente y correcta con el servidor.</li>
              <li>Desarrollo de funcionalidades de geolocalización y visualización cartográfica utilizando OSMDroid y PROJ4J.</li>
              <li>Optimización de rendimiento mediante la incoporación de LiveData, ViewModel y manejo eficiente de hilos de ejecución.</li>
              <li>Desarrollo de una API RESTful en PHP con autenticación basada en JWT.</li>
            </ul>
          </div>

          <div className="card">
            <h3>Macanas Place</h3>
            <p><strong>Desarrollador C++ / Qt6</strong> | 2024</p>
            <ul>
              <li>Desarrollo completo de un sistema POS utilizando C++17 y Qt6.</li>
              <li>Implementación de una arquitectura MVC para mejorar la mantenibilidad del sistema.</li>
              <li>Optimización del rendimiento de la interfaz gráfica mediante el uso de señales y slots de Qt.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tecnologías */}
      <section id="skills" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <h2 className="section-title">Tecnologías</h2>
          <div className="flex gap-md" style={{ alignItems: 'flex-start' }}>
            <div className="card" style={{ flex: 1 }}>
              <h3>Lenguajes</h3>
              <ul>
                <li>Kotlin (avanzado)</li>
                <li>C / C++ (avanzado)</li>
                <li>Python (intermedio)</li>
                <li>Java (intermedio)</li>
                <li>PHP (intermedio)</li>
                <li>Assembly (básico)</li>
              </ul>
            </div>
            <div className="card" style={{ flex: 1 }}>
              <h3>Frameworks</h3>
              <ul>
                <li>Android Jetpack / Compose</li>
                <li>Dagger Hilt</li>
                <li>Retrofit, OkHttp, Gson</li>
                <li>Qt6</li>
                <li>OSMDroid y PROJ4J</li>
                <li>Gradle Kotlin DSL</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Educación */}
      <section id="education" className="container">
        <h2 className="section-title">Educación</h2>
        <div className="card">
          <p><strong>Universidad de Costa Rica (UCR)</strong></p>
          <p>Bachillerato en Ciencias de la Computación (Estudiante avanzado)</p>
          <p className="color-muted">2022 – Presente</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center">
        <div className="container flex-col centered gap-sm">
          <h3>Contacto</h3>
          <p>
            <a href="mailto:aaron.carmona@ucr.ac.cr" className="nav-link">
              aaron.carmona@ucr.ac.cr
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}