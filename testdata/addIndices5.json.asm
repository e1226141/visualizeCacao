MBB:0017 
0x00007fafa075cfb8:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075cfbd:   8b ce                            mov    %esi,%ecx
0x00007fafa075cfbf:   03 ca                            add    %edx,%ecx
0x00007fafa075cfc1:   41 b8 00 00 00 00                mov    $0x0,%r8d
0x00007fafa075cfc7:   41 3b c8                         cmp    %r8d,%ecx
0x00007fafa075cfca:   0f 8c 05 00 00 00                jl     0x00007fafa075cfd5
0x00007fafa075cfd0:   e9 05 00 00 00                   jmpq   0x00007fafa075cfda
MBB:0021 
0x00007fafa075cfd5:   e9 1b 00 00 00                   jmpq   0x00007fafa075cff5
MBB:0018 
0x00007fafa075cfda:   8b 57 10                         mov    0x10(%rdi),%edx
0x00007fafa075cfdd:   3b ca                            cmp    %edx,%ecx
0x00007fafa075cfdf:   0f 8d 05 00 00 00                jge    0x00007fafa075cfea
0x00007fafa075cfe5:   e9 05 00 00 00                   jmpq   0x00007fafa075cfef
MBB:0022 
0x00007fafa075cfea:   e9 06 00 00 00                   jmpq   0x00007fafa075cff5
MBB:0019 
0x00007fafa075cfef:   8b 4c 8f 18                      mov    0x18(%rdi,%rcx,4),%ecx
0x00007fafa075cff3:   03 c1                            add    %ecx,%eax
MBB:0020 
0x00007fafa075cff5:   c3                               retq   
