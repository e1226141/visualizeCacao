MBB:0048 
0x00007fafa075db50:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075db55:   3b f0                            cmp    %eax,%esi
0x00007fafa075db57:   0f 8e 05 00 00 00                jle    0x00007fafa075db62
0x00007fafa075db5d:   e9 05 00 00 00                   jmpq   0x00007fafa075db67
MBB:0053 
0x00007fafa075db62:   e9 2a 00 00 00                   jmpq   0x00007fafa075db91
MBB:0049 
0x00007fafa075db67:   8b 47 10                         mov    0x10(%rdi),%eax
MBB:0050 
0x00007fafa075db6a:   3b f0                            cmp    %eax,%esi
0x00007fafa075db6c:   0f 8d 05 00 00 00                jge    0x00007fafa075db77
0x00007fafa075db72:   e9 05 00 00 00                   jmpq   0x00007fafa075db7c
MBB:0054 
0x00007fafa075db77:   e9 15 00 00 00                   jmpq   0x00007fafa075db91
MBB:0051 
0x00007fafa075db7c:   b9 00 00 00 00                   mov    $0x0,%ecx
0x00007fafa075db81:   89 4c b7 18                      mov    %ecx,0x18(%rdi,%rsi,4)
0x00007fafa075db85:   b9 01 00 00 00                   mov    $0x1,%ecx
0x00007fafa075db8a:   03 f1                            add    %ecx,%esi
0x00007fafa075db8c:   e9 d9 ff ff ff                   jmpq   0x00007fafa075db6a
MBB:0052 
0x00007fafa075db91:   c3                               retq   
