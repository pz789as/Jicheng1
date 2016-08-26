//
//  ExampleInterface.m
//  Jicheng1
//
//  Created by guojicheng on 16/6/21.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ExampleInterface.h"
#import "CallAdressbook.h"

@interface ExampleInterface()

@property (nonatomic, strong) NSDictionary* dic;

@end

@implementation ExampleInterface

-(instancetype)init{
  return self;
}

-(NSString*) contactName{
  if (!_contactName){
    _contactName = @"";
  }
  return _contactName;
}

@synthesize bridge = _bridge;
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(sendMessage:(NSString*) msg)
{
  NSLog(@"收到来自React Native的消息：%@", msg);
  NSData* data = [msg dataUsingEncoding:NSUTF8StringEncoding];
  NSError* error;
  NSDictionary* dic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:&error];
  if (error!=nil){
    NSLog(@"解析错误：%@", error);
  }
  NSString* login = [dic objectForKey:@"msgType"];
  if ([login isEqualToString:@"pickContact"]){
    [self callAddress];
    
    [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder"
                                                 body:@{@"name": @"12345"}];
  }
}

//RCT_REMAP_METHOD(handleMessage:(NSString*)rnmessage,
//                 resolver:(RCTPromiseResolveBlock)resolve
//                 rejecter:(RCTPromiseRejectBlock)rejecte)
//{
//  BOOL ret = YES;
//  if (ret){
//    resolve(@"success");
//  }else{
//    NSError* error = [[NSError alloc] initWithDomain:@"domain" code:1 userInfo:nil];
//    rejecte(@"code", @"message", error);
//  }
//}

-(void)callAddress{
  UIViewController* controller = (UIViewController*)[[[UIApplication sharedApplication] keyWindow] rootViewController];
  CallAdressbook* addressbook = [[CallAdressbook alloc] init];
  [controller presentViewController:addressbook animated:YES completion:nil];
  self.contactName = addressbook.contactName;
  self.contactPhoneNumber = addressbook.contactPhoneNumber;
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(calendarEventReminderReceived:) name:@"Num" object:nil];
}

-(dispatch_queue_t)methodQueue{
  return dispatch_get_main_queue();
}

-(void)calendarEventReminderReceived:(NSNotification*)notification{
  self.contactPhoneNumber = notification.object;
  self.contactName = notification.userInfo[@"name"];
  //去除获取到的电话号码中的特殊字符
  self.contactPhoneNumber = [self.contactPhoneNumber stringByReplacingOccurrencesOfString:@"-" withString:@""];
  self.contactPhoneNumber = [self.contactPhoneNumber stringByReplacingOccurrencesOfString:@"(" withString:@""];
  self.contactPhoneNumber = [self.contactPhoneNumber stringByReplacingOccurrencesOfString:@" " withString:@""];
  NSMutableDictionary* dic = [[NSMutableDictionary alloc] init];
  [dic setObject:@"pickContactResult" forKey:@"msgType"];
  if (self.contactPhoneNumber == nil){
    self.contactPhoneNumber = @"";
  }
  [dic setObject:self.contactPhoneNumber forKey:@"peerNumber"];
  if (self.contactName == nil){
    self.contactName = @"";
  }
  //组装发送给React Native侧的消息
  [dic setObject:self.contactName forKey:@"displayName"];
  self.dic = [dic copy];
  NSError* error = [[NSError alloc] init];
  NSData* data = [NSJSONSerialization dataWithJSONObject:self.dic options:0 error:&error];
  NSString* str = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  [self.bridge.eventDispatcher sendInputEventWithName:@"NativeModuleMsg" body:@{@"message":str}];
}

@end


