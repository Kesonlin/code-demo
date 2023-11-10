void sort::shellsort(linklist *head)  //希尔插入排序在单链表上的实现
{
    linklist *pre1,*pre2,*l1,*n1,*n2,*l;
 n1=head;
 int n=0;
 int i;
 pre1=head;
 pre2=head;
 while(n1!=NULL)
 {
   n1=n1->next;
  n++;
 }
 n1=head->next;
 n2=head->next;
 l1=n1;
 while(n=1)
 {
  n=n/2;
  i=0;
  n1=l1;
  n2=l1;
  l1=l1->next;
  while(n2!=NULL)
  {
   while(i<n)
   {
     pre2=pre2->next;
     n2=pre2->next;
     i++;
   } 
   i=0;
   while(n1!=n2)
   {
     if(n1->data>n2->data)
    {
       n2=pre1->next;
       n1=pre2->next;
      break;
    }
     while(i<n)
    {
     pre1=pre1->next;
      n1=pre1->next;
      i++;
    } 
   } 
  }
 }  
    l=head->next;
    printf("insert-sort output:\n");
   while(l) //依次输出排序后链表元素
    {
        printf("%d ",l->data);
        l=l->next;
    }
}

void sort::halfinsertsort(linklist *head)  //折半插入排序在单链表上的实现
{
    linklist *newhead1,*newhead2,*pre1,*pre2,*l2,*l,*left,*right,*mid,*n1,*n2;
    left=head->next; //变量p用来存放链L1的头结点地址
    newhead2=left->next->next; //newhead2(待插入结点)用来标记链L2的头结点的地址
    right=left->next;
    right=NULL;
    if(left->data>right->data)
 {
     head->next=right;
     right->next=left;
     left->next=NULL;  //将原来的链L断开
  }
    while(newhead2) //判断：1.原链L中元素不少于两个。2.新链L2中还有元素未插入L1
    {
     pre1=head;
     pre2=head;
     n1=head->next;
     n2=head->next;
       l2=newhead2;  //l2指向待插入结点（链L2的头结点）
       newhead2=newhead2->next; //l2去掉头结点后头指针后移
       while(true)
    {
        n1=left;
     n2=left->next;
     while(n2)
  {
       pre1=pre1->next;
       pre2=pre2->next;
     n1=n1->next;
     n2=n2->next;
     if(n2==NULL)
  {
      break;
     }
     pre2=pre2->next;
     n2=n2->next;
    }
    mid=n1;
    if(mid==left)
    break;
    if(l2->data<mid->data)
  {
      right=pre1;
    }
    else
  {
      left=mid->next;
      if(left==NULL)
      break;
    }
    }
     if(mid->data<l2->data)
  {
     mid->next=l2;
   }
  else
  {
    if(left->data<l2->data)
  {
     left->next=l2;
     l2->next=mid;
    }
  else
  {
     pre1->next=l2;
     l2->next=left;
   }
   }
  
  }
    l=head->n