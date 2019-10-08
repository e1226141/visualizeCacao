MBB:0091 
0x00007fafa075e630:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075e635:   b9 00 00 00 00                   mov    $0x0,%ecx
0x00007fafa075e63a:   8b 57 10                         mov    0x10(%rdi),%edx
MBB:0092 
0x00007fafa075e63d:   3b ca                            cmp    %edx,%ecx
0x00007fafa075e63f:   0f 8d 16 00 00 00                jge    0x00007fafa075e65b
MBB:0093 
0x00007fafa075e645:   44 8b 44 8f 18                   mov    0x18(%rdi,%rcx,4),%r8d
0x00007fafa075e64a:   41 03 c0                         add    %r8d,%eax
0x00007fafa075e64d:   41 b8 01 00 00 00                mov    $0x1,%r8d
0x00007fafa075e653:   41 03 c8                         add    %r8d,%ecx
0x00007fafa075e656:   e9 e2 ff ff ff                   jmpq   0x00007fafa075e63d
MBB:0094 
0x00007fafa075e65b:   ba 00 00 00 00                   mov    $0x0,%edx
0x00007fafa075e660:   8b 4e 10                         mov    0x10(%rsi),%ecx
MBB:0095 
0x00007fafa075e663:   3b d1                            cmp    %ecx,%edx
0x00007fafa075e665:   0f 8d 12 00 00 00                jge    0x00007fafa075e67d
MBB:0096 
0x00007fafa075e66b:   8b 7c 96 18                      mov    0x18(%rsi,%rdx,4),%edi
0x00007fafa075e66f:   03 c7                            add    %edi,%eax
0x00007fafa075e671:   bf 01 00 00 00                   mov    $0x1,%edi
0x00007fafa075e676:   03 d7                            add    %edi,%edx
0x00007fafa075e678:   e9 e6 ff ff ff                   jmpq   0x00007fafa075e663
MBB:0097 
0x00007fafa075e67d:   c3                               retq   
