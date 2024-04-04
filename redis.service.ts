import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as Redis from 'ioredis';
@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly redisClient: Redis.Redis;

  constructor() {
    this.redisClient = new Redis.Redis({
      host: 'localhost', // Set your Redis server host
      port: 6379, // Set your Redis server port
      // Add other configuration options as needed
    });
  }
  getRedisClient(): Redis.Redis {
    return this.redisClient;
  }

  // async setValue(key: string, value: string, expiresIn: number) {
  //   try {
  //     if (this.redisClient) {
  //       const set_value = await this.redisClient.set(
  //         key,
  //         value,
  //         'EX',
  //         expiresIn,
  //       );
  //       console.log(set_value, 'set value');
  //       return set_value;
  //     } else {
  //       console.error('Redis client is not initialized.');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // }

  // async getValue(key: any) {
  //   const result = await this.redisClient.get(key);
  //   console.log(result, 'get value');
  //   return result;
  // }

  // async setOtpCode(contact_no: string, otp_code: string) {
  //   const a = await this.setValue(contact_no, otp_code, 7);
  //   console.log(a, 'setOtpCode');
  //   return a;
  // }

  async setOtp(
    mobileNumber: string,
    otp: string,
    expirationTimeSeconds: number,
  ) {
    const key = `otp:${mobileNumber}`;
    const a = this.redisClient.setex(mobileNumber, 10, otp);
    return a;
  }

  async getOtp(mobileNumber: string): Promise<string | null> {
    const key = `otp:${mobileNumber}`;
    return await this.redisClient.get(mobileNumber);
  }
  onModuleDestroy() {
    // Close the Redis connection when the module is being destroyed
    this.redisClient.quit();
  }
}
