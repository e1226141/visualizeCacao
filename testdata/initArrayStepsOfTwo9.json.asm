MBB:0044 
0x00007fafa075d950:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075d955:   8b 4f 10                         mov    0x10(%rdi),%ecx
MBB:0045 
0x00007fafa075d958:   3b c1                            cmp    %ecx,%eax
0x00007fafa075d95a:   0f 8d 15 00 00 00                jge    0x00007fafa075d975
MBB:0046 
0x00007fafa075d960:   ba 00 00 00 00                   mov    $0x0,%edx
0x00007fafa075d965:   89 54 87 18                      mov    %edx,0x18(%rdi,%rax,4)
0x00007fafa075d969:   ba 02 00 00 00                   mov    $0x2,%edx
0x00007fafa075d96e:   03 c2                            add    %edx,%eax
0x00007fafa075d970:   e9 e3 ff ff ff                   jmpq   0x00007fafa075d958
MBB:0047 
0x00007fafa075d975:   c3                               retq   
