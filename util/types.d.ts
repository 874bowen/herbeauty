import {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";
declare const tables: readonly [
  {
    readonly name: "nextauth_accounts";
    readonly columns: readonly [
      {
        readonly name: "user";
        readonly type: "link";
        readonly link: {
          readonly table: "nextauth_users";
        };
      },
      {
        readonly name: "type";
        readonly type: "string";
      },
      {
        readonly name: "provider";
        readonly type: "string";
      },
      {
        readonly name: "providerAccountId";
        readonly type: "string";
      },
      {
        readonly name: "refresh_token";
        readonly type: "string";
      },
      {
        readonly name: "access_token";
        readonly type: "string";
      },
      {
        readonly name: "expires_at";
        readonly type: "int";
      },
      {
        readonly name: "token_type";
        readonly type: "string";
      },
      {
        readonly name: "scope";
        readonly type: "string";
      },
      {
        readonly name: "id_token";
        readonly type: "text";
      },
      {
        readonly name: "session_state";
        readonly type: "string";
      }
    ];
  },
  {
    readonly name: "nextauth_sessions";
    readonly columns: readonly [
      {
        readonly name: "sessionToken";
        readonly type: "string";
      },
      {
        readonly name: "expires";
        readonly type: "datetime";
      },
      {
        readonly name: "user";
        readonly type: "link";
        readonly link: {
          readonly table: "nextauth_users";
        };
      }
    ];
  },
  {
    readonly name: "nextauth_users";
    readonly columns: readonly [
      {
        readonly name: "email";
        readonly type: "email";
      },
      {
        readonly name: "emailVerified";
        readonly type: "datetime";
      },
      {
        readonly name: "name";
        readonly type: "string";
      },
      {
        readonly name: "image";
        readonly type: "string";
      }
    ];
  },
  {
    readonly name: "nextauth_users_accounts";
    readonly columns: readonly [
      {
        readonly name: "user";
        readonly type: "link";
        readonly link: {
          readonly table: "nextauth_users";
        };
      },
      {
        readonly name: "account";
        readonly type: "link";
        readonly link: {
          readonly table: "nextauth_accounts";
        };
      }
    ];
  },
  {
    readonly name: "nextauth_users_sessions";
    readonly columns: readonly [
      {
        readonly name: "user";
        readonly type: "link";
        readonly link: {
          readonly table: "nextauth_users";
        };
      },
      {
        readonly name: "session";
        readonly type: "link";
        readonly link: {
          readonly table: "nextauth_sessions";
        };
      }
    ];
  },
  {
    readonly name: "nextauth_verificationTokens";
    readonly columns: readonly [
      {
        readonly name: "identifier";
        readonly type: "string";
      },
      {
        readonly name: "token";
        readonly type: "string";
      },
      {
        readonly name: "expires";
        readonly type: "datetime";
      }
    ];
  }
];
export declare type SchemaTables = typeof tables;
export declare type InferredTypes = SchemaInference<SchemaTables>;
export declare type NextauthAccounts = InferredTypes["nextauth_accounts"];
export declare type NextauthAccountsRecord = NextauthAccounts & XataRecord;
export declare type NextauthSessions = InferredTypes["nextauth_sessions"];
export declare type NextauthSessionsRecord = NextauthSessions & XataRecord;
export declare type NextauthUsers = InferredTypes["nextauth_users"];
export declare type NextauthUsersRecord = NextauthUsers & XataRecord;
export declare type NextauthUsersAccounts =
  InferredTypes["nextauth_users_accounts"];
export declare type NextauthUsersAccountsRecord = NextauthUsersAccounts &
  XataRecord;
export declare type NextauthUsersSessions =
  InferredTypes["nextauth_users_sessions"];
export declare type NextauthUsersSessionsRecord = NextauthUsersSessions &
  XataRecord;
export declare type NextauthVerificationTokens =
  InferredTypes["nextauth_verificationTokens"];
export declare type NextauthVerificationTokensRecord =
  NextauthVerificationTokens & XataRecord;
export declare type DatabaseSchema = {
  nextauth_accounts: NextauthAccountsRecord;
  nextauth_sessions: NextauthSessionsRecord;
  nextauth_users: NextauthUsersRecord;
  nextauth_users_accounts: NextauthUsersAccountsRecord;
  nextauth_users_sessions: NextauthUsersSessionsRecord;
  nextauth_verificationTokens: NextauthVerificationTokensRecord;
};
declare const DatabaseClient: any;
export declare class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions);
}
export declare const getXataClient: () => XataClient;
export {};
