import { Module } from "@nestjs/common";
import { AuthService } from "@thallesp/nestjs-better-auth";
import { AuthController } from "src/auth/auth.controller";
import { AccountModule } from "./account/account.module";
import { AuthenticatorModule } from "./authenticator/authenticator.module";
import { KnexModule } from "./knex/knex.module";
import { KnexService } from "./knex/knex.service";
import { RoleModule } from "./role/role.module";
import { SessionModule } from "./session/session.module";
import { UserModule } from "./user/user.module";
import { UserpassModule } from "./userpass/userpass.module";
import { UsertypeModule } from "./usertype/usertype.module";
import { UsertypeactivityModule } from "./usertypeactivity/usertypeactivity.module";
import { VerificationtokenModule } from "./verificationtoken/verificationtoken.module";

@Module({
  imports : [
    KnexModule,
    AccountModule,AuthenticatorModule,
    RoleModule,SessionModule,UserModule,
    UserpassModule, UsertypeModule,
    UsertypeactivityModule,VerificationtokenModule
  ],
  exports : [
    KnexModule,
    AccountModule,AuthenticatorModule,
    RoleModule,SessionModule,UserModule,
    UserpassModule, UsertypeModule,
    UsertypeactivityModule,VerificationtokenModule
]
})
export class SServiceModule {}