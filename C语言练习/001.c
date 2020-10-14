#include <stdio.h>
#define MaxSize 50
typedef int ElemType;
typedef struct {
   ElemType data[MaxSize];
   int lengrht;
} Sqlist;

void SqlistInit()