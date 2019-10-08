MBB:0083 
0x00007fafa075e288:   90                               nop
0x00007fafa075e289:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075e28e:   b9 00 00 00 00                   mov    $0x0,%ecx
0x00007fafa075e293:   8b 57 10                         mov    0x10(%rdi),%edx
MBB:0084 
0x00007fafa075e296:   3b ca                            cmp    %edx,%ecx
0x00007fafa075e298:   0f 8f 25 00 00 00                jg     0x00007fafa075e2c3
MBB:0085 
0x00007fafa075e29e:   8b 77 10                         mov    0x10(%rdi),%esi
0x00007fafa075e2a1:   3b ce                            cmp    %esi,%ecx
0x00007fafa075e2a3:   0f 82 08 00 00 00                jb     0x00007fafa075e2b1
0x00007fafa075e2a9:   48 8b 0c 25 02 00 00 00          mov    0x2,%rcx
0x00007fafa075e2b1:   8b 74 8f 18                      mov    0x18(%rdi,%rcx,4),%esi
0x00007fafa075e2b5:   03 c6                            add    %esi,%eax
0x00007fafa075e2b7:   be 01 00 00 00                   mov    $0x1,%esi
0x00007fafa075e2bc:   03 ce                            add    %esi,%ecx
0x00007fafa075e2be:   e9 d3 ff ff ff                   jmpq   0x00007fafa075e296
MBB:0086 
0x00007fafa075e2c3:   c3                               retq   
