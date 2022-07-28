import { makeProperty } from './functions';

export function sealed(param: string) {
    return function (constructor: Function): void {
        console.log(`Sealed ${param} `, constructor);
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    };
}

export function logger<TFunction extends Function>(constructor: TFunction): TFunction {
    const newConstructor: Function = function () {
        console.log('Crating new instance', constructor);
        this.age = 30;
    };
    newConstructor.prototype = Object.create(constructor.prototype);
    // Object.setPrototypeOf(newConstructor.prototype, constructor.prototype);
    newConstructor.prototype.printLibrarian = function () {
        console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`);
    };
    return newConstructor as TFunction;
}

export function writable(isWritebale: boolean) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        descriptor.writable = isWritebale;
        return descriptor;
    };
}

export function timeout(ms: number = 0) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originalMethod = descriptor.value;
        type Params = Parameters<typeof originalMethod>;
        descriptor.value = function (...params: Params) {
            if (window.confirm('Are you sure')) {
                setTimeout(() => {
                    originalMethod.apply(this, params);
                }, ms);
            }
        };
        return descriptor;
    };
}

export function logParameter(target: any, methodName: string, parameterIndex: number) {
    const key = `${methodName}_decor_params_indexes`;
    const proto = typeof target === 'function' ? target.prototype : target;
    (proto[key] ??= []).push(parameterIndex);
}

export function logMethod(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const key = `${methodName}_decor_params_indexes`;
    const proto = typeof target === 'function' ? target.prototype : target;
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const indexes = proto[key];
        if (Array.isArray(indexes)) {
            args.forEach((arg, idx) => {
                if (indexes.includes(idx)) {
                    console.log(`Method: ${methodName}, ParamIndex: ${idx}, ParamValue: ${arg}`);
                }
            });
        }
        return originalMethod.apply(this, args);
    };
    return descriptor;
}

export function format(pref: string = 'Mr./Mrs.') {
    return function (target: any, propName: string) {
        console.log('decor', { target, propName, pref });
        makeProperty(
            target,
            propName,
            value => `${pref} ${value}`,
            value => value,
        );
    };
}

export function positiveInteger(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalSet = descriptor.set;
    descriptor.set = function (n: number) {
        if (n < 1 || !Number.isInteger(n)) {
            throw new Error('Invalid value');
        }
        originalSet?.call(this, n);
    };
    return descriptor;
}
