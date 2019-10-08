MBB:0055 
0x00007fafa075ddd0:   b8 01 00 00 00                   mov    $0x1,%eax
0x00007fafa075ddd5:   8b 4f 10                         mov    0x10(%rdi),%ecx
0x00007fafa075ddd8:   ba 01 00 00 00                   mov    $0x1,%edx
0x00007fafa075dddd:   2b ca                            sub    %edx,%ecx
MBB:0056 
0x00007fafa075dddf:   ba 00 00 00 00                   mov    $0x0,%edx
0x00007fafa075dde4:   3b c2                            cmp    %edx,%eax
0x00007fafa075dde6:   0f 84 5f 00 00 00                je     0x00007fafa075de4b
MBB:0057 
0x00007fafa075ddec:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075ddf1:   ba 00 00 00 00                   mov    $0x0,%edx
MBB:0058 
0x00007fafa075ddf6:   3b d1                            cmp    %ecx,%edx
0x00007fafa075ddf8:   0f 8d 48 00 00 00                jge    0x00007fafa075de46
MBB:0059 
0x00007fafa075ddfe:   8b 74 97 18                      mov    0x18(%rdi,%rdx,4),%esi
0x00007fafa075de02:   41 b8 01 00 00 00                mov    $0x1,%r8d
0x00007fafa075de08:   44 8b ca                         mov    %edx,%r9d
0x00007fafa075de0b:   45 03 c8                         add    %r8d,%r9d
0x00007fafa075de0e:   46 8b 44 8f 18                   mov    0x18(%rdi,%r9,4),%r8d
0x00007fafa075de13:   41 3b f0                         cmp    %r8d,%esi
0x00007fafa075de16:   0f 8e 05 00 00 00                jle    0x00007fafa075de21
0x00007fafa075de1c:   e9 05 00 00 00                   jmpq   0x00007fafa075de26
MBB:0064 
0x00007fafa075de21:   e9 18 00 00 00                   jmpq   0x00007fafa075de3e
MBB:0060 
0x00007fafa075de26:   b8 01 00 00 00                   mov    $0x1,%eax
0x00007fafa075de2b:   8b 74 97 18                      mov    0x18(%rdi,%rdx,4),%esi
0x00007fafa075de2f:   46 8b 44 8f 18                   mov    0x18(%rdi,%r9,4),%r8d
0x00007fafa075de34:   44 89 44 97 18                   mov    %r8d,0x18(%rdi,%rdx,4)
0x00007fafa075de39:   42 89 74 8f 18                   mov    %esi,0x18(%rdi,%r9,4)
MBB:0061 
0x00007fafa075de3e:   41 8b d1                         mov    %r9d,%edx
0x00007fafa075de41:   e9 b0 ff ff ff                   jmpq   0x00007fafa075ddf6
MBB:0062 
0x00007fafa075de46:   e9 94 ff ff ff                   jmpq   0x00007fafa075dddf
MBB:0063 
0x00007fafa075de4b:   c3                               retq   
