//
//  ExampleInterface.h
//  Jicheng1
//
//  Created by guojicheng on 16/6/21.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"


@interface ExampleInterface : NSObject<RCTBridgeModule>

@property (nonatomic, strong) NSString* contactName;
@property (nonatomic, strong) NSString* contactPhoneNumber;

@end
