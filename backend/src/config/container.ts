import 'reflect-metadata';

import { identifiers } from '@app/config/identifiers';
import type { AuthServiceContract } from '@app/modules/auth/contracts/auth.service.contract';
import type { PasswordChangeRequestRepositoryContract } from '@app/modules/auth/contracts/password-change-request.repository.contract';
import { AuthController } from '@app/modules/auth/controllers/auth.controller';
import { TypeormPasswordChangeRequestRepository } from '@app/modules/auth/repositories/typeorm-password-change-request.respository';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { DeleteUsedPasswordChangeRequestTask } from '@app/modules/auth/tasks/delete-used-password-change-request.task';
import { ForgotPasswordUseCase } from '@app/modules/auth/use-cases/forgot-password.use-case';
import { RefreshTokenUseCase } from '@app/modules/auth/use-cases/refresh-token.use-case';
import { ResetPasswordUseCase } from '@app/modules/auth/use-cases/reset-password.use-case';
import { SignInUseCase } from '@app/modules/auth/use-cases/sign-in.use-case';
import { SignUpUseCase } from '@app/modules/auth/use-cases/sign-up.use-case';
import type { MailerServiceContract } from '@app/modules/mailer/contracts/mailer-service.contract';
import { MailerService } from '@app/modules/mailer/services/mailer.service';
import type { TaskRepositoryContract } from '@app/modules/task/contracts/task.repository.contract';
import type { TaskServiceContract } from '@app/modules/task/contracts/task.service.contract';
import { TaskController } from '@app/modules/task/controllers/task.controller';
import { TypeormTaskRepository } from '@app/modules/task/repositories/typeorm-task.respository';
import { TaskService } from '@app/modules/task/services/task.service';
import { CreateTaskUseCase } from '@app/modules/task/use-cases/create-task.use-case';
import { DeleteTaskUseCase } from '@app/modules/task/use-cases/delete-task.use-case';
import { GetTaskUseCase } from '@app/modules/task/use-cases/get-task.use-case';
import { ListPaginatedTaskUseCase } from '@app/modules/task/use-cases/list-paginated-task.use-case';
import { UpdateTaskUseCase } from '@app/modules/task/use-cases/update-task.use-case';
import type { UserRepositoryContract } from '@app/modules/user/contracts/user.repository.contract';
import type { UserServiceContract } from '@app/modules/user/contracts/user.service.contract';
import { TypeormUserRepository } from '@app/modules/user/repositories/typeorm-user.respository';
import { UserService } from '@app/modules/user/services/user.service';
import type { HashServiceContract } from '@app/shared/contracts/hash-service.contract';
import type { JwtServiceContract } from '@app/shared/contracts/jwt-service.contract';
import type { TypeormServiceContract } from '@app/shared/contracts/typeorm.contract';
import { BCryptService } from '@app/shared/services/bcrypt.service';
import { JwtService } from '@app/shared/services/jwt.service';
import { TypeormService } from '@app/shared/services/typeorm.service';
import { Container } from 'inversify';

const container = new Container();

container.bind<TypeormServiceContract>(identifiers.TypeormServiceContract).to(TypeormService);

container.bind<HashServiceContract>(identifiers.HashServiceContract).to(BCryptService);
container.bind<JwtServiceContract>(identifiers.JwtServiceContract).to(JwtService);

container.bind<MailerServiceContract>(identifiers.MailerServiceContract).to(MailerService);

container.bind<AuthServiceContract>(identifiers.AuthServiceContract).to(AuthService);
container
  .bind<PasswordChangeRequestRepositoryContract>(identifiers.PasswordChangeRequestRepositoryContract)
  .to(TypeormPasswordChangeRequestRepository);
container.bind<AuthController>(identifiers.AuthController).to(AuthController);
container.bind<SignInUseCase>(identifiers.SignInUseCase).to(SignInUseCase);
container.bind<SignUpUseCase>(identifiers.SignUpUseCase).to(SignUpUseCase);
container.bind<RefreshTokenUseCase>(identifiers.RefreshTokenUseCase).to(RefreshTokenUseCase);
container.bind<ForgotPasswordUseCase>(identifiers.ForgotPasswordUseCase).to(ForgotPasswordUseCase);
container.bind<ResetPasswordUseCase>(identifiers.ResetPasswordUseCase).to(ResetPasswordUseCase);
container
  .bind<DeleteUsedPasswordChangeRequestTask>(identifiers.DeleteUsedPasswordChangeRequestTask)
  .to(DeleteUsedPasswordChangeRequestTask);

container.bind<TaskServiceContract>(identifiers.TaskServiceContract).to(TaskService);
container.bind<TaskRepositoryContract>(identifiers.TaskRepositoryContract).to(TypeormTaskRepository);
container.bind<CreateTaskUseCase>(identifiers.CreateTaskUseCase).to(CreateTaskUseCase);
container.bind<UpdateTaskUseCase>(identifiers.UpdateTaskUseCase).to(UpdateTaskUseCase);
container.bind<GetTaskUseCase>(identifiers.GetTaskUseCase).to(GetTaskUseCase);
container.bind<ListPaginatedTaskUseCase>(identifiers.ListPaginatedTaskUseCase).to(ListPaginatedTaskUseCase);
container.bind<DeleteTaskUseCase>(identifiers.DeleteTaskUseCase).to(DeleteTaskUseCase);
container.bind<TaskController>(identifiers.TaskController).to(TaskController);

container.bind<UserRepositoryContract>(identifiers.UserRepositoryContract).to(TypeormUserRepository);
container.bind<UserServiceContract>(identifiers.UserServiceContract).to(UserService);

export { container };
