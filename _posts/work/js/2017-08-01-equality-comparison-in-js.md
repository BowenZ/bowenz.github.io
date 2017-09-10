---
layout: post
title:  "JavaScript中的相等比较"
subtitle: "'=='和'==='的判断规则"
keywords: JavaScript
categories: [work, js]
tags: js
titleimg: 
---

在js中，`x==y`和`x===y`都会比较x、y两个值的相等性，并返回`true`或`false`，二者遵循以下规则：

## 1.==

1. 如果x和y的类型相同，则会返回`x===y`的结果
2. 如果x为`null`而y为`undefined`，则返回`true`
3. 如果x为`undefined `而y为`null`，则返回`true`
4. 如果x类型为`Number`，y类型为`String`，则会返回`x==Number(y)`
5. 如果x类型为`String`，y类型为`Number`，则会返回`Number(x)==y`
6. 如果x为布尔值，则返回`Number(x)==y`
7. 如果y为布尔值，则返回`x==Number(y)`
8. 如果x类型为`String`、`Number`和[Symbol](https://www.ecma-international.org/ecma-262/#sec-ecmascript-language-types-symbol-type)类型之一，y类型为`Object`，则返回`x==ToPrimitive(y)`
9. 如果x类型为`Object`，y类型为`String`、`Number`和`Symbol`类型之一，则返回`ToPrimitive(x) == y`
10. 其他情况，返回`false`

## 2.===

1. 如果x和y的类型不同，则返回false
2. 如果x类型为`Number`，则
	- 如果x为`NaN`则返回`false`
	- 如果y为`NaN`则返回`false`
	- 如果如果x和y为相等的数值，则返回`true`
	- 如果x为`+0`，y为`-0`，则返回`true`
	- 如果x为`-0`，y为`+0`，则返回`true`
	- 其他情况返回`false`
3. 其他情况返回[SameValueNonNumber](https://www.ecma-international.org/ecma-262/#sec-samevaluenonnumber)(x, y)

---
> 参考[ecma-international](https://www.ecma-international.org/ecma-262/#sec-abstract-equality-comparison)