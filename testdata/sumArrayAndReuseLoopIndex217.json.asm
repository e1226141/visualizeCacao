MBB:0087 
0x00007fafa075e348:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075e34d:   b9 00 00 00 00                   mov    $0x0,%ecx
0x00007fafa075e352:   8b 57 10                         mov    0x10(%rdi),%edx
MBB:0088 
0x00007fafa075e355:   3b c2                            cmp    %edx,%eax
0x00007fafa075e357:   0f 8d 12 00 00 00                jge    0x00007fafa075e36f
MBB:0089 
0x00007fafa075e35d:   8b 74 87 18                      mov    0x18(%rdi,%rax,4),%esi
0x00007fafa075e361:   03 ce                            add    %esi,%ecx
0x00007fafa075e363:   be 01 00 00 00                   mov    $0x1,%esi
0x00007fafa075e368:   03 c6                            add    %esi,%eax
0x00007fafa075e36a:   e9 e6 ff ff ff                   jmpq   0x00007fafa075e355
MBB:0090 
0x00007fafa075e36f:   ba 01 00 00 00                   mov    $0x1,%edx
0x00007fafa075e374:   8b f0                            mov    %eax,%esi
0x00007fafa075e376:   2b f2                            sub    %edx,%esi
0x00007fafa075e378:   8b 47 10                         mov    0x10(%rdi),%eax
0x00007fafa075e37b:   3b f0                            cmp    %eax,%esi
0x00007fafa075e37d:   0f 82 08 00 00 00                jb     0x00007fafa075e38b
0x00007fafa075e383:   48 8b 34 25 02 00 00 00          mov    0x2,%rsi
0x00007fafa075e38b:   8b 44 b7 18                      mov    0x18(%rdi,%rsi,4),%eax
0x00007fafa075e38f:   03 c8                            add    %eax,%ecx
0x00007fafa075e391:   8b c1                            mov    %ecx,%eax
0x00007fafa075e393:   c3                               retq   
