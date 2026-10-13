module.exports = [
  {
    title: 'Backend Architecture',
    items: [
      { title: 'Layered Architecture & DI', slug: 'index', file: 'layered-architecture.html' },
      { title: 'Repository Pattern', slug: 'repository-pattern', file: 'repository-pattern.html' },
      { title: 'Strongly-Typed Configuration', slug: 'options-pattern', file: 'options-pattern.html' },
    ],
  },
  {
    title: 'API Layer',
    items: [
      { title: 'ApiResponse & Controllers', slug: 'api-response', file: 'api-response.html' },
      { title: 'JWT Authentication', slug: 'jwt-auth', file: 'jwt-auth.html' },
      { title: 'HttpOnly Cookie Authentication', slug: 'cookie-auth', file: 'cookie-auth.html' },
      { title: 'Global Exception Middleware', slug: 'exception-middleware', file: 'exception-middleware.html' },
      { title: 'Webhooks', slug: 'webhooks', file: 'webhooks.html' },
    ],
  },
  {
    title: 'Blazor Frontend',
    items: [
      { title: 'JWT Auth State', slug: 'blazor-auth-state', file: 'blazor-auth-state.html' },
      { title: 'HTTP Service Wrapper', slug: 'http-service', file: 'http-service.html' },
      { title: 'Toast Notification Service', slug: 'toast-notifications', file: 'toast-notifications.html' },
      { title: 'JavaScript Interop', slug: 'blazor-js-interop', file: 'blazor-js-interop.html' },
    ],
  },
  {
    title: 'Angular Frontend',
    items: [
      { title: 'JWT Auth (Interceptor & Guard)', slug: 'angular-auth', file: 'angular-auth.html' },
      { title: 'HTTP Service Wrapper', slug: 'angular-http-service', file: 'angular-http-service.html' },
    ],
  },
  {
    title: 'Desktop Apps',
    items: [
      { title: 'Windows Forms App', slug: 'winforms-app', file: 'winforms-app.html' },
    ],
  },
  {
    title: 'Patterns & Utilities',
    items: [
      { title: 'Mapping & Validation Extensions', slug: 'mapping-validation', file: 'mapping-validation.html' },
      { title: 'In-Memory Caching', slug: 'in-memory-caching', file: 'in-memory-caching.html' },
      { title: 'Background Jobs', slug: 'background-jobs', file: 'background-jobs.html' },
    ],
  },
  {
    title: 'Data & Auditing',
    items: [
      { title: 'Composable Repository Interfaces', slug: 'composable-repositories', file: 'composable-repositories.html' },
      { title: 'Field-Level Audit Logging', slug: 'audit-logging', file: 'audit-logging.html' },
      { title: 'Generic Pagination Pattern', slug: 'pagination-pattern', file: 'pagination-pattern.html' },
      { title: 'Migrations & Transactions', slug: 'database-migrations', file: 'database-migrations.html' },
    ],
  },
  {
    title: 'Deployment',
    items: [
      { title: 'Dockerizing for nginx', slug: 'docker-nginx', file: 'docker-nginx.html' },
      { title: 'Docker for Local Development', slug: 'docker-local-dev', file: 'docker-local-dev.html' },
      { title: 'CI Pipeline (GitHub Actions)', slug: 'ci-pipeline', file: 'ci-pipeline.html' },
    ],
  },
  {
    title: 'CLI & JSON',
    items: [
      { title: 'Building a CLI Tool', slug: 'cli-tool', file: 'cli-tool.html' },
      { title: 'JSON Serialization Patterns', slug: 'json-serialization', file: 'json-serialization.html' },
    ],
  },
  {
    title: 'Testing',
    items: [
      { title: 'Unit Testing with Moq', slug: 'unit-testing-moq', file: 'unit-testing-moq.html' },
    ],
  },
];
