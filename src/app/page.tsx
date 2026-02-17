import Image from "next/image";
import MobileMenu from "./components/MobileMenu";
import ScrollAnimation from "./components/ScrollAnimation";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">정현주</h1>
            
            {/* 데스크톱 메뉴 */}
            <div className="hidden md:flex gap-8 items-center">
              <a href="#about" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
              <a href="#skills" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Skills</a>
              <a href="#experience" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Experience</a>
              <a href="#projects" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</a>
              <a href="/coaching" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">1:1 코칭</a>
              <a href="#contact" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
            </div>

            {/* 모바일 메뉴 */}
            <MobileMenu />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                Backend Developer
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                안녕하세요,<br />
                <span className="text-blue-600 dark:text-blue-400">정현주</span>입니다
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                확장 가능하고 효율적인 백엔드 시스템을 설계하고 구축하는 것을 좋아하는 개발자입니다.
                깨끗한 코드와 최적화된 아키텍처를 통해 비즈니스 가치를 창출합니다.
              </p>
              <div className="flex gap-4">
                <a 
                  href="#contact" 
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30"
                >
                  Contact Me
                </a>
                <a 
                  href="#projects" 
                  className="px-8 py-3 border-2 border-slate-300 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
                >
                  View Projects
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl transform rotate-6 opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center text-white text-8xl font-bold shadow-2xl">
                  정
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">About Me</h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              <p>
                저는 5년 이상의 백엔드 개발 경험을 가진 소프트웨어 엔지니어입니다.
                복잡한 비즈니스 로직을 효율적인 코드로 변환하고, 대용량 트래픽을 처리하는 시스템을 설계하는 것에 열정을 가지고 있습니다.
              </p>
              <p>
                데이터베이스 최적화, API 설계, 마이크로서비스 아키텍처에 특히 관심이 많으며,
                항상 최신 기술 트렌드를 학습하고 적용하려고 노력합니다.
              </p>
              <p>
                클린 코드와 테스트 주도 개발(TDD)을 실천하며, 팀과의 협업을 통해 더 나은 제품을 만들어가는 것을 즐깁니다.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">🎓 Education</h3>
                <p className="text-slate-600 dark:text-slate-400">컴퓨터공학 학사</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">💼 Experience</h3>
                <p className="text-slate-600 dark:text-slate-400">5+ years in Backend Development</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">📍 Location</h3>
                <p className="text-slate-600 dark:text-slate-400">Seoul, South Korea</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">Skills & Technologies</h2>
          </ScrollAnimation>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Languages */}
            <ScrollAnimation delay={100}>
              <div className="p-8 bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Languages</h3>
                <div className="space-y-3">
                  {['Java', 'Python', 'Go', 'JavaScript/TypeScript', 'SQL'].map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-slate-600 dark:text-slate-400">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            {/* Frameworks & Tools */}
            <ScrollAnimation delay={200}>
              <div className="p-8 bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🛠️</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Frameworks & Tools</h3>
                <div className="space-y-3">
                  {['Spring Boot', 'Django', 'FastAPI', 'Node.js', 'Express', 'Docker', 'Kubernetes'].map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-slate-600 dark:text-slate-400">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            {/* Databases & Infrastructure */}
            <ScrollAnimation delay={300}>
              <div className="p-8 bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🗄️</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Databases & Infrastructure</h3>
                <div className="space-y-3">
                  {['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'AWS', 'GCP', 'CI/CD'].map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-slate-600 dark:text-slate-400">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">Experience</h2>
          </ScrollAnimation>
          
          <div className="space-y-8">
            {/* Experience 1 */}
            <div className="relative pl-8 pb-12 border-l-2 border-blue-600">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-lg">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Senior Backend Developer</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">Tech Company A</p>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400">2021 - Present</span>
                </div>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li>• 마이크로서비스 아키텍처 설계 및 구현</li>
                  <li>• 월 1억 건 이상의 API 요청을 처리하는 시스템 개발</li>
                  <li>• 데이터베이스 쿼리 최적화로 응답 시간 60% 개선</li>
                  <li>• CI/CD 파이프라인 구축 및 자동화</li>
                </ul>
              </div>
            </div>

            {/* Experience 2 */}
            <div className="relative pl-8 pb-12 border-l-2 border-purple-600">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-600 rounded-full"></div>
              <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-lg">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Backend Developer</h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">Startup B</p>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400">2019 - 2021</span>
                </div>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li>• RESTful API 설계 및 개발</li>
                  <li>• 결제 시스템 통합 및 트랜잭션 처리</li>
                  <li>• Redis 캐싱 전략으로 시스템 성능 3배 향상</li>
                  <li>• 실시간 데이터 처리 파이프라인 구축</li>
                </ul>
              </div>
            </div>

            {/* Experience 3 */}
            <div className="relative pl-8 border-l-2 border-green-600">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-green-600 rounded-full"></div>
              <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-lg">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Junior Developer</h3>
                    <p className="text-green-600 dark:text-green-400 font-medium">Company C</p>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400">2018 - 2019</span>
                </div>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li>• 사내 관리 시스템 백엔드 개발</li>
                  <li>• 데이터베이스 모델링 및 쿼리 작성</li>
                  <li>• 유닛 테스트 및 통합 테스트 작성</li>
                  <li>• API 문서 작성 및 유지보수</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">Featured Projects</h2>
          </ScrollAnimation>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <div className="text-white text-6xl">🚀</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">E-Commerce Platform</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  대규모 전자상거래 플랫폼의 백엔드 시스템 설계 및 구현. 
                  마이크로서비스 아키텍처를 활용하여 확장 가능한 시스템을 구축했습니다.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">Java</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">Spring Boot</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">PostgreSQL</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">Redis</span>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Learn More →</a>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <div className="text-white text-6xl">💬</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">Real-time Chat System</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  WebSocket을 활용한 실시간 채팅 시스템 개발. 
                  10만 명 이상의 동시 접속자를 처리할 수 있는 인프라를 구축했습니다.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">Go</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">WebSocket</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">MongoDB</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">Docker</span>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">Learn More →</a>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group">
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                <div className="text-white text-6xl">📊</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">Data Analytics API</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  대용량 데이터 분석을 위한 고성능 REST API 개발. 
                  효율적인 쿼리 최적화로 분석 속도를 10배 향상시켰습니다.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">Python</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">FastAPI</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">PostgreSQL</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">AWS</span>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-green-600 dark:text-green-400 hover:underline font-medium">Learn More →</a>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group">
              <div className="h-48 bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
                <div className="text-white text-6xl">🔐</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">Authentication Service</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  JWT 기반의 안전한 인증/인가 시스템 구축. 
                  OAuth 2.0 및 소셜 로그인을 지원하는 마이크로서비스를 개발했습니다.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm">Express</span>
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm">JWT</span>
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm">Redis</span>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-orange-600 dark:text-orange-400 hover:underline font-medium">Learn More →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollAnimation>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Let's Work Together</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
              새로운 프로젝트나 협업 기회에 대해 이야기를 나누고 싶으시다면 언제든 연락주세요!
            </p>
          </ScrollAnimation>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Email</h3>
              <a href="mailto:dev.jungjh@example.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                dev.jungjh@example.com
              </a>
            </div>
            
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="text-4xl mb-3">💼</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">LinkedIn</h3>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                linkedin.com/in/jungjh
              </a>
            </div>
            
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="text-4xl mb-3">🐙</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">GitHub</h3>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                github.com/jungjh
              </a>
            </div>
          </div>

          <a 
            href="mailto:dev.jungjh@example.com" 
            className="inline-block px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/30"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-600 dark:text-slate-400">
          <p>© 2026 정현주. All rights reserved.</p>
          <p className="mt-2 text-sm">Built with Next.js and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
