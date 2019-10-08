MBB:0023 
0x00007fafa075d190:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075d195:   8b 4f 10                         mov    0x10(%rdi),%ecx
MBB:0024 
0x00007fafa075d198:   3b c1                            cmp    %ecx,%eax
0x00007fafa075d19a:   0f 8d 15 00 00 00                jge    0x00007fafa075d1b5
MBB:0025 
0x00007fafa075d1a0:   ba 00 00 00 00                   mov    $0x0,%edx
0x00007fafa075d1a5:   89 54 87 18                      mov    %edx,0x18(%rdi,%rax,4)
0x00007fafa075d1a9:   ba 01 00 00 00                   mov    $0x1,%edx
0x00007fafa075d1ae:   03 c2                            add    %edx,%eax
0x00007fafa075d1b0:   e9 e3 ff ff ff                   jmpq   0x00007fafa075d198
MBB:0026 
0x00007fafa075d1b5:   c3                               retq   
