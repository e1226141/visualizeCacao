MBB:0034 
0x00007fafa075d5c8:   8b 47 10                         mov    0x10(%rdi),%eax
0x00007fafa075d5cb:   b9 01 00 00 00                   mov    $0x1,%ecx
0x00007fafa075d5d0:   2b c1                            sub    %ecx,%eax
MBB:0035 
0x00007fafa075d5d2:   b9 00 00 00 00                   mov    $0x0,%ecx
0x00007fafa075d5d7:   3b c1                            cmp    %ecx,%eax
0x00007fafa075d5d9:   0f 8e 5c 00 00 00                jle    0x00007fafa075d63b
MBB:0036 
0x00007fafa075d5df:   b9 01 00 00 00                   mov    $0x1,%ecx
MBB:0037 
0x00007fafa075d5e4:   3b c8                            cmp    %eax,%ecx
0x00007fafa075d5e6:   0f 8f 43 00 00 00                jg     0x00007fafa075d62f
MBB:0038 
0x00007fafa075d5ec:   ba 01 00 00 00                   mov    $0x1,%edx
0x00007fafa075d5f1:   8b f1                            mov    %ecx,%esi
0x00007fafa075d5f3:   2b f2                            sub    %edx,%esi
0x00007fafa075d5f5:   8b 54 b7 18                      mov    0x18(%rdi,%rsi,4),%edx
0x00007fafa075d5f9:   44 8b 44 8f 18                   mov    0x18(%rdi,%rcx,4),%r8d
0x00007fafa075d5fe:   41 3b d0                         cmp    %r8d,%edx
0x00007fafa075d601:   0f 8e 05 00 00 00                jle    0x00007fafa075d60c
0x00007fafa075d607:   e9 05 00 00 00                   jmpq   0x00007fafa075d611
MBB:0043 
0x00007fafa075d60c:   e9 12 00 00 00                   jmpq   0x00007fafa075d623
MBB:0039 
0x00007fafa075d611:   8b 54 b7 18                      mov    0x18(%rdi,%rsi,4),%edx
0x00007fafa075d615:   44 8b 44 8f 18                   mov    0x18(%rdi,%rcx,4),%r8d
0x00007fafa075d61a:   44 89 44 b7 18                   mov    %r8d,0x18(%rdi,%rsi,4)
0x00007fafa075d61f:   89 54 8f 18                      mov    %edx,0x18(%rdi,%rcx,4)
MBB:0040 
0x00007fafa075d623:   ba 01 00 00 00                   mov    $0x1,%edx
0x00007fafa075d628:   03 ca                            add    %edx,%ecx
0x00007fafa075d62a:   e9 b5 ff ff ff                   jmpq   0x00007fafa075d5e4
MBB:0041 
0x00007fafa075d62f:   b9 ff ff ff ff                   mov    $0xffffffff,%ecx
0x00007fafa075d634:   03 c1                            add    %ecx,%eax
0x00007fafa075d636:   e9 97 ff ff ff                   jmpq   0x00007fafa075d5d2
MBB:0042 
0x00007fafa075d63b:   c3                               retq   
