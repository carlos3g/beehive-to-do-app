export const identifiers = {
  TypeormServiceContract: Symbol.for('TypeormServiceContract'),

  HashServiceContract: Symbol.for('HashServiceContract'),
  JwtServiceContract: Symbol.for('JwtServiceContract'),

  MailerServiceContract: Symbol.for('MailerServiceContract'),

  AuthServiceContract: Symbol.for('AuthServiceContract'),
  PasswordChangeRequestRepositoryContract: Symbol.for('PasswordChangeRequestRepositoryContract'),
  AuthController: Symbol.for('AuthController'),
  SignUpUseCase: Symbol.for('SignUpUseCase'),
  SignInUseCase: Symbol.for('SignInUseCase'),
  RefreshTokenUseCase: Symbol.for('RefreshTokenUseCase'),
  ForgotPasswordUseCase: Symbol.for('ForgotPasswordUseCase'),
  ResetPasswordUseCase: Symbol.for('ResetPasswordUseCase'),
  DeleteUsedPasswordChangeRequestTask: Symbol.for('DeleteUsedPasswordChangeRequestTask'),

  TaskServiceContract: Symbol.for('TaskServiceContract'),
  TaskRepositoryContract: Symbol.for('TaskRepositoryContract'),
  CreateTaskUseCase: Symbol.for('CreateTaskUseCase'),
  GetTaskUseCase: Symbol.for('GetTaskUseCase'),
  ListPaginatedTaskUseCase: Symbol.for('ListPaginatedTaskUseCase'),
  UpdateTaskUseCase: Symbol.for('UpdateTaskUseCase'),
  DeleteTaskUseCase: Symbol.for('DeleteTaskUseCase'),
  TaskController: Symbol.for('TaskController'),

  UserRepositoryContract: Symbol.for('UserRepositoryContract'),
  UserServiceContract: Symbol.for('UserServiceContract'),
};
