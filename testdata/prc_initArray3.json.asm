MBB:0009 
0x00007fafa075ccb8:   90                               nop
0x00007fafa075ccb9:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075ccbe:   b9 ff ff ff ff                   mov    $0xffffffff,%ecx
0x00007fafa075ccc3:   8b d6                            mov    %esi,%edx
0x00007fafa075ccc5:   03 d1                            add    %ecx,%edx
0x00007fafa075ccc7:   8b 4f 10                         mov    0x10(%rdi),%ecx
0x00007fafa075ccca:   3b ca                            cmp    %edx,%ecx
0x00007fafa075cccc:   0f 8d 08 00 00 00                jge    0x00007fafa075ccda
0x00007fafa075ccd2:   48 8b 0c 25 0f 00 00 00          mov    0xf,%rcx
MBB:0010 
0x00007fafa075ccda:   3b c6                            cmp    %esi,%eax
0x00007fafa075ccdc:   0f 8d 15 00 00 00                jge    0x00007fafa075ccf7
MBB:0011 
0x00007fafa075cce2:   b9 00 00 00 00                   mov    $0x0,%ecx
0x00007fafa075cce7:   89 4c 87 18                      mov    %ecx,0x18(%rdi,%rax,4)
0x00007fafa075cceb:   b9 01 00 00 00                   mov    $0x1,%ecx
0x00007fafa075ccf0:   03 c1                            add    %ecx,%eax
0x00007fafa075ccf2:   e9 e3 ff ff ff                   jmpq   0x00007fafa075ccda
MBB:0012 
0x00007fafa075ccf7:   c3                               retq   
