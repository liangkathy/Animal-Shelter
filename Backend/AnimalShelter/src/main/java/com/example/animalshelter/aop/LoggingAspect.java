package com.example.animalshelter.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Slf4j
@Aspect
@Component
public class LoggingAspect {

    @Pointcut("execution(* com.example.animalshelter.*..*.*(..))") //for all service layers in program
    public void allMethods() {
    }

    @Pointcut("execution(* com.example.animalshelter.controller..*.*(..))") //for all service layers in program
    public void controllerMethods() {
    }

    //logging trigger time before each method
    @Before("allMethods()")
    public void logBeforeAllMethods(JoinPoint joinPoint) {
        log.info("Before Method: " + joinPoint.getSignature().toShortString() + "; Trigger time: " + System.currentTimeMillis());
    }

    //after returning to log results of successful method run (point cut set to controller bc to string returns null prior)
    @AfterReturning(pointcut = "controllerMethods()", returning = "returnValue")
    public void logAfterReturningAllMethods(JoinPoint joinPoint, Object returnValue) {
        log.info("After Returning Method: " + joinPoint.getSignature().toShortString() + "; Return: " + returnValue.toString());
    }

    //logging after any methods in program when Exception is thrown
    @AfterThrowing(pointcut = "allMethods()", throwing = "throwable")
    public void logAfterThrowingAllMethodExceptions(JoinPoint joinPoint, Throwable throwable) {
        String methodName = joinPoint.getSignature().toShortString(); //get method name and shorten if needed
        String arguments = Arrays.toString(joinPoint.getArgs()); //get arguments passed in method

        //log error message with details
        log.error("Exception caught in method: "
                + methodName + " with arguments: " + arguments + ". Exception message: " + throwable.getMessage());
    }


}
