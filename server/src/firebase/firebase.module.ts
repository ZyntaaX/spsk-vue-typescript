import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebaseConfig = {
      type: configService.get<string>('FIREBASE_ADMIN_TYPE'),
      project_id: configService.get<string>('FIREBASE_ADMIN_PROJECT_ID'),
      private_key_id: configService.get<string>(
        'FIREBASE_ADMIN_PRIVATE_KEY_ID',
      ),
      private_key: configService.get<string>('FIREBASE_ADMIN_PRIVATE_KEY'),
      client_email: configService.get<string>('FIREBASE_ADMIN_CLIENT_EMAIL'),
      client_id: configService.get<string>('FIREBASE_ADMIN_CLIENT_ID'),
      auth_uri: configService.get<string>('FIREBASE_ADMIN_AUTH_URI'),
      token_uri: configService.get<string>('FIREBASE_ADMIN_TOKEN_URI'),
      auth_provider_x509_cert_url: configService.get<string>(
        'FIREBASE_ADMIN_AUTH_PROVIDER_CERT',
      ),
      client_x509_cert_url: configService.get<string>(
        'FIREBASE_ADMIN_CLIENT_CERT',
      ),
      universe_domain: configService.get<string>(
        'FIREBASE_ADMIN_UNIVERSE_DOMAIN',
      ),
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};

@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider],
  exports: [],
})
export class FirebaseModule {}
